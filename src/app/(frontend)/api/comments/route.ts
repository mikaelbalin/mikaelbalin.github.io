import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { AT_PROTO_COOKIE } from "#lib/auth/atproto";
import { getComments, postComment } from "#lib/services/CommentService";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "60 s"),
});

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get("uri");

  if (!uri) {
    return NextResponse.json({ error: "uri is required" }, { status: 400 });
  }

  try {
    const comments = await getComments(uri);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("[comments] GET error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load comments",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const did = cookieStore.get(AT_PROTO_COOKIE)?.value;

  if (!did) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const ip = ipAddress(request);
  // Fall back to the authenticated DID so a missing IP (non-Vercel runtime or
  // header edge case) never collapses every request into a shared bucket.
  const key = ip ?? did;

  try {
    const { success } = await rateLimit.limit(key);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Service temporarily unavailable",
      },
      { status: 503 },
    );
  }

  const { uri, text }: { uri?: string; text?: string } = await request.json();

  if (!uri || !text) {
    return NextResponse.json(
      { error: "uri and text are required" },
      { status: 400 },
    );
  }

  try {
    const comment = await postComment(uri, text, did);
    return NextResponse.json({ comment });
  } catch (error) {
    console.error("[comments] POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to post comment",
      },
      { status: 500 },
    );
  }
}
