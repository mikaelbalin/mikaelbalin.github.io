import { Agent } from "@atproto/api";
import { getOAuthClient } from "#lib/auth/atproto";

// Public Bluesky AppView. Reading threads is public and does not require OAuth.
const PUBLIC_BSKY_API = "https://public.api.bsky.app";

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
  const agent = new Agent(PUBLIC_BSKY_API);
  const { data } = await agent.getPostThread({ uri, depth: 1 });

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

  // Resolve the parent post's CID via the public AppView. `getPosts` is a
  // public endpoint and does not require the OAuth session's scopes.
  const publicAgent = new Agent(PUBLIC_BSKY_API);
  const { data } = await publicAgent.getPosts({ uris: [uri] });
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
