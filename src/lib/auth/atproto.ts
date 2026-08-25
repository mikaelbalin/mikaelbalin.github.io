import { JoseKey } from "@atproto/jwk-jose";
import type {
  NodeSavedSession,
  NodeSavedState,
  OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import {
  buildAtprotoLoopbackClientMetadata,
  NodeOAuthClient,
} from "@atproto/oauth-client-node";
import { Redis } from "@upstash/redis";
import { getServerSideURL } from "#lib/getURL";

/**
 * OAuth scopes requested from the user.
 *
 * - `atproto` is the mandatory profile marker (grants identity only).
 * - `repo:app.bsky.feed.post` grants write access to the user's post
 *   collection, which is what we need to create replies (a reply is just a
 *   `app.bsky.feed.post` record with a `reply` field).
 *
 * Reads (getProfile, getPostThread) are public and are done with a public
 * agent, so they don't need any scope here.
 */
export const SCOPE = "atproto repo:app.bsky.feed.post";
export const AT_PROTO_COOKIE = "atproto_did";

/**
 * Base URL used for the OAuth client metadata and redirects.
 * In development we use 127.0.0.1 explicitly, because the loopback
 * client metadata normalizes `localhost` to `127.0.0.1`, and the
 * redirect/cookie host must match.
 */
export function getOAuthBaseURL(): string {
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:3000";
  }
  return getServerSideURL();
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const stateStore = {
  async get(key: string): Promise<NodeSavedState | undefined> {
    const value = (await redis.get(
      `atproto:state:${key}`,
    )) as NodeSavedState | null;
    return value ?? undefined;
  },
  async set(key: string, value: NodeSavedState): Promise<void> {
    await redis.set(`atproto:state:${key}`, value);
  },
  async del(key: string): Promise<void> {
    await redis.del(`atproto:state:${key}`);
  },
};

const sessionStore = {
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const value = (await redis.get(
      `atproto:session:${key}`,
    )) as NodeSavedSession | null;
    return value ?? undefined;
  },
  async set(key: string, value: NodeSavedSession): Promise<void> {
    await redis.set(`atproto:session:${key}`, value);
  },
  async del(key: string): Promise<void> {
    await redis.del(`atproto:session:${key}`);
  },
};

const globalAuth = globalThis as unknown as {
  atprotoClient?: NodeOAuthClient;
};

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (globalAuth.atprotoClient) {
    return globalAuth.atprotoClient;
  }

  const isDev = process.env.NODE_ENV === "development";
  const baseURL = getOAuthBaseURL();

  const clientMetadata: OAuthClientMetadataInput = isDev
    ? buildAtprotoLoopbackClientMetadata({
        scope: SCOPE,
        redirect_uris: [`${baseURL}/api/oauth/callback`],
      })
    : {
        client_id: `${baseURL}/api/oauth/client-metadata.json`,
        client_name: "Mikael Balin",
        client_uri: baseURL,
        redirect_uris: [`${baseURL}/api/oauth/callback`],
        scope: SCOPE,
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "private_key_jwt",
        token_endpoint_auth_signing_alg: "ES256",
        dpop_bound_access_tokens: true,
        jwks_uri: `${baseURL}/api/oauth/jwks.json`,
        application_type: "web",
      };

  const privateKeys = [
    process.env.ATPROTO_PRIVATE_KEY_1,
    process.env.ATPROTO_PRIVATE_KEY_2,
    process.env.ATPROTO_PRIVATE_KEY_3,
  ].filter((key): key is string => Boolean(key));

  if (privateKeys.length === 0) {
    throw new Error(
      "No ATPROTO private keys configured. Set ATPROTO_PRIVATE_KEY_1 (and optionally _2, _3).",
    );
  }

  const keyset = await Promise.all(
    privateKeys.map((key, index) =>
      JoseKey.fromImportable(key, `atproto-key-${index + 1}`),
    ),
  );

  const client = new NodeOAuthClient({
    clientMetadata,
    keyset,
    stateStore,
    sessionStore,
  });

  globalAuth.atprotoClient = client;

  return client;
}
