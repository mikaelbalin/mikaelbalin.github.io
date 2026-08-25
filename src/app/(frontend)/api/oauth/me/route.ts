import { Agent } from "@atproto/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AT_PROTO_COOKIE } from "#lib/auth/atproto";

// Public Bluesky AppView. Reading profiles/threads is public and does not
// require OAuth, so we use a public agent here.
const PUBLIC_BSKY_API = "https://public.api.bsky.app";

export async function GET() {
  const cookieStore = await cookies();
  const did = cookieStore.get(AT_PROTO_COOKIE)?.value;

  if (!did) {
    return NextResponse.json({ user: null });
  }

  try {
    const agent = new Agent(PUBLIC_BSKY_API);
    const profile = await agent.getProfile({ actor: did });

    return NextResponse.json({
      user: {
        did: profile.data.did,
        handle: profile.data.handle,
        displayName: profile.data.displayName,
        avatar: profile.data.avatar,
      },
    });
  } catch (error) {
    console.error("[oauth/me] error:", error);
    return NextResponse.json({ user: null });
  }
}
