import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "#payload.config";

export async function GET(_request: NextRequest) {
  const metrics = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
  };

  const startTime = Date.now();

  try {
    // Measure Payload initialization time
    const payloadStartTime = Date.now();
    const payload = await getPayload({ config });
    const payloadInitTime = Date.now() - payloadStartTime;

    // Measure database query time
    const dbStartTime = Date.now();
    const _testQuery = await payload.find({
      collection: "users",
      limit: 1,
      depth: 0,
      pagination: false,
    });
    const dbQueryTime = Date.now() - dbStartTime;

    const totalTime = Date.now() - startTime;

    return NextResponse.json({
      ...metrics,
      performance: {
        payloadInitTime: `${payloadInitTime}ms`,
        dbQueryTime: `${dbQueryTime}ms`,
        totalTime: `${totalTime}ms`,
        isColdStart: totalTime > 1000, // Likely cold start if > 1 second
      },
      status: "success",
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;

    return NextResponse.json(
      {
        ...metrics,
        performance: {
          totalTime: `${totalTime}ms`,
          isColdStart: totalTime > 1000,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        status: "error",
      },
      { status: 500 },
    );
  }
}
