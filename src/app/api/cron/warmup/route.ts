import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "#payload.config";

export async function GET(_request: NextRequest) {
  try {
    const startTime = Date.now();

    // Initialize Payload CMS to warm up the connection
    const payload = await getPayload({ config });

    // Perform a lightweight database query to warm up the connection pool
    const _healthCheck = await payload.find({
      collection: "users",
      limit: 1,
      depth: 0,
      pagination: false,
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    return NextResponse.json({
      status: "warm",
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      message: "Warmup successful",
    });
  } catch (error) {
    console.error("Warmup failed:", error);

    return NextResponse.json(
      {
        status: "cold",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
