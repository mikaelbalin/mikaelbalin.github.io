import { NextRequest, NextResponse } from "next/server";
import { getClientSideURL } from "@/utilities/getURL";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { ipAddress } from "@vercel/functions";

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(2, "60 s"),
});

export async function POST(req: NextRequest) {
  const ip = ipAddress(req);
  const { success } = await rateLimit.limit(ip || "127.0.0.1");

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
      },
      { status: 429 },
    );
  }

  const {
    form,
    submissionData,
  }: {
    form: string;
    submissionData: {
      field: string;
      value: string;
    }[];
  } = await req.json();

  try {
    const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
      body: JSON.stringify({
        form,
        submissionData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: json.errors?.[0] || "Internal Server Error",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An error occurred",
      },
      {
        status: 500,
      },
    );
  }
}
