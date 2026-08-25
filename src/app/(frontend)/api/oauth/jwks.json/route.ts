import { NextResponse } from "next/server";
import { getOAuthClient } from "#lib/auth/atproto";

export async function GET() {
  const client = await getOAuthClient();
  return NextResponse.json(client.jwks);
}
