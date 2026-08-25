import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AT_PROTO_COOKIE, getOAuthClient } from "#lib/auth/atproto";

export async function POST() {
  const cookieStore = await cookies();
  const did = cookieStore.get(AT_PROTO_COOKIE)?.value;

  try {
    if (did) {
      const client = await getOAuthClient();
      await client.revoke(did);
    }
  } catch {
    // Even if revocation fails, we still clear the local cookie.
  }

  cookieStore.delete(AT_PROTO_COOKIE);

  return NextResponse.json({ success: true });
}
