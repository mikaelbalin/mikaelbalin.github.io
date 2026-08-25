import { OAuthCallbackError } from "@atproto/oauth-client-node";
import { type NextRequest, NextResponse } from "next/server";
import {
  AT_PROTO_COOKIE,
  getOAuthBaseURL,
  getOAuthClient,
  sanitizeReturnTo,
} from "#lib/auth/atproto";

function buildAuthRedirect(returnTo: string, status: "success" | "error") {
  const url = new URL(returnTo, getOAuthBaseURL());
  url.searchParams.set("auth", status);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const client = await getOAuthClient();

  try {
    const { session, state } = await client.callback(params);
    const returnTo = sanitizeReturnTo(state);

    const response = buildAuthRedirect(returnTo, "success");

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

    // The client surfaces our `returnTo` (the `appState`) on the error, so we
    // can still send the user back to where they started.
    const returnTo = sanitizeReturnTo(
      error instanceof OAuthCallbackError ? error.state : undefined,
    );

    return buildAuthRedirect(returnTo, "error");
  }
}
