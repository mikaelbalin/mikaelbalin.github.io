import { type NextRequest, NextResponse } from "next/server";
import {
  AT_PROTO_COOKIE,
  getOAuthBaseURL,
  getOAuthClient,
} from "#lib/auth/atproto";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const client = await getOAuthClient();
    const { session } = await client.callback(params);

    const response = NextResponse.redirect(new URL("/", getOAuthBaseURL()));

    response.cookies.set(AT_PROTO_COOKIE, session.did, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/?error=login_failed", getOAuthBaseURL()),
    );
  }
}
