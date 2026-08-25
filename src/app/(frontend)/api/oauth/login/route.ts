import { NextResponse } from "next/server";
import { getOAuthClient, SCOPE } from "#lib/auth/atproto";

export async function POST(request: Request) {
  try {
    const { handle: rawHandle } = await request.json();

    if (!rawHandle || typeof rawHandle !== "string") {
      return NextResponse.json(
        { error: "Handle is required" },
        { status: 400 },
      );
    }

    // Strip a leading "@" if the user typed it (e.g. "@mikaelbalin.com").
    const handle = rawHandle.replace(/^@/, "");

    const client = await getOAuthClient();
    const url = await client.authorize(handle, { scope: SCOPE });

    return NextResponse.json({ redirectUrl: url.toString() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 500 },
    );
  }
}
