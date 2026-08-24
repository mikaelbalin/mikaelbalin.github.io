import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";
import { getClientSideURL } from "#lib/getURL";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, "60 s"),
});

export async function POST(req: NextRequest) {
  const ip = ipAddress(req);

  try {
    const { success } = await rateLimit.limit(ip || "127.0.0.1");

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests",
        },
        { status: 429 },
      );
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
      console.error("Error submitting form:", json);
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
