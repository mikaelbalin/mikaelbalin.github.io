import { Agent } from "@atproto/api";
import { getOAuthClient } from "#lib/auth/atproto";

// Public Bluesky AppView. Reading threads is public and does not require OAuth.
const PUBLIC_BSKY_API = "https://public.api.bsky.app";

// Matches a bsky.app post URL, e.g.
// https://bsky.app/profile/mikaelbalin.bsky.social/post/3mtw6ik5pec2f
const BSKY_POST_URL_RE =
  /^https?:\/\/bsky\.app\/profile\/([^/?#]+)\/post\/([^/?#]+)/;

/**
 * Normalizes a post reference into an `at://` URI.
 *
 * Accepts either an `at://` URI directly, or a bsky.app post URL (which is
 * what the Bluesky UI lets you copy). For a URL we resolve the handle to a DID
 * via the public AppView and rebuild the canonical `at://` URI.
 */
async function resolvePostUri(input: string): Promise<string> {
  if (input.startsWith("at://")) {
    return input;
  }

  const match = input.match(BSKY_POST_URL_RE);
  if (!match) {
    throw new Error(
      "Invalid post reference. Expected an at:// URI or a bsky.app post URL.",
    );
  }

  const [, actor, rkey] = match;

  // If the actor is already a DID, no resolution is needed.
  if (actor.startsWith("did:")) {
    return `at://${actor}/app.bsky.feed.post/${rkey}`;
  }

  const agent = new Agent(PUBLIC_BSKY_API);
  const { data } = await agent.getProfile({ actor });

  return `at://${data.did}/app.bsky.feed.post/${rkey}`;
}

export type Comment = {
  uri: string;
  cid: string;
  author: {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  text: string;
  indexedAt: string;
  likeCount?: number;
  replyCount?: number;
};

function isThreadViewPost(value: unknown): value is {
  post: {
    uri: string;
    cid: string;
    author: {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
    };
    record: { text?: string };
    indexedAt: string;
    likeCount?: number;
    replyCount?: number;
  };
} {
  return (
    typeof value === "object" &&
    value !== null &&
    "post" in value &&
    typeof (value as { post?: unknown }).post === "object"
  );
}

export async function getComments(uri: string): Promise<Comment[]> {
  const resolvedUri = await resolvePostUri(uri);
  const agent = new Agent(PUBLIC_BSKY_API);
  const { data } = await agent.getPostThread({ uri: resolvedUri, depth: 1 });

  const thread = data.thread;

  if (!isThreadViewPost(thread)) {
    return [];
  }

  const replies = (thread as { replies?: unknown[] }).replies ?? [];

  return replies.filter(isThreadViewPost).map((reply) => ({
    uri: reply.post.uri,
    cid: reply.post.cid,
    author: {
      did: reply.post.author.did,
      handle: reply.post.author.handle,
      displayName: reply.post.author.displayName,
      avatar: reply.post.author.avatar,
    },
    text: reply.post.record.text ?? "",
    indexedAt: reply.post.indexedAt,
    likeCount: reply.post.likeCount,
    replyCount: reply.post.replyCount,
  }));
}

export async function postComment(
  uri: string,
  text: string,
  did: string,
): Promise<{ uri: string; cid: string }> {
  const client = await getOAuthClient();
  const session = await client.restore(did);
  const agent = new Agent(session);

  const resolvedUri = await resolvePostUri(uri);

  // Resolve the parent post's CID via the public AppView. `getPosts` is a
  // public endpoint and does not require the OAuth session's scopes.
  const publicAgent = new Agent(PUBLIC_BSKY_API);
  const { data } = await publicAgent.getPosts({ uris: [resolvedUri] });
  const parent = data.posts[0];

  if (!parent) {
    throw new Error("Post not found");
  }

  return agent.post({
    text,
    reply: {
      root: { uri: parent.uri, cid: parent.cid },
      parent: { uri: parent.uri, cid: parent.cid },
    },
  });
}
