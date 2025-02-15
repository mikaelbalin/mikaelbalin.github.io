import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await fetch(`https://${process.env.VERCEL_URL}`);
  return NextResponse.json({ ok: true });
}
