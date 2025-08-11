import { NextRequest, NextResponse } from "next/server";
import { loadavg } from "os";

interface SystemMetrics {
  timestamp: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  loadAverage: number[];
  cpuUsage: NodeJS.CpuUsage;
  env: {
    nodeEnv: string;
    vercelRegion?: string;
    vercelUrl?: string;
  };
}

export async function GET(_request: NextRequest) {
  const startTime = performance.now();

  const metrics: SystemMetrics = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    loadAverage: process.platform !== "win32" ? loadavg() : [0, 0, 0],
    cpuUsage: process.cpuUsage(),
    env: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      vercelRegion: process.env.VERCEL_REGION,
      vercelUrl: process.env.VERCEL_URL,
    },
  };

  // Calculate memory usage in MB
  const memoryInMB = {
    rss: Math.round((metrics.memoryUsage.rss / 1024 / 1024) * 100) / 100,
    heapTotal:
      Math.round((metrics.memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed:
      Math.round((metrics.memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
    external:
      Math.round((metrics.memoryUsage.external / 1024 / 1024) * 100) / 100,
  };

  const responseTime = performance.now() - startTime;

  // Determine if this is likely a cold start
  const isColdStart = metrics.uptime < 2 || responseTime > 100;

  return NextResponse.json({
    status: "success",
    performance: {
      responseTime: `${Math.round(responseTime * 100) / 100}ms`,
      isColdStart,
      coldStartIndicators: {
        lowUptime: metrics.uptime < 2,
        slowResponse: responseTime > 100,
      },
    },
    system: {
      ...metrics,
      memoryUsageMB: memoryInMB,
      uptimeFormatted: `${Math.floor(metrics.uptime / 60)}m ${Math.floor(metrics.uptime % 60)}s`,
    },
    recommendations: isColdStart
      ? [
          "This appears to be a cold start",
          "Consider implementing function warming",
          "Review database connection pooling",
          "Check for heavy imports in your API routes",
        ]
      : ["Function is warm and performing well", "Response time is optimal"],
  });
}
