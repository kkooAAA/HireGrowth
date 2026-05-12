import { NextResponse } from "next/server";
import { fetchDailyMetrics } from "@/lib/analytics/fetchAdData";
import { getCachedData } from "@/lib/cache";

export async function GET() {
  try {
    const metrics = await getCachedData("analytics_daily", fetchDailyMetrics);
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
