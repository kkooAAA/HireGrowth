import { NextResponse } from "next/server";
import { fetchDailyMetrics } from "@/lib/analytics/fetchAdData";

export async function GET() {
  try {
    const metrics = await fetchDailyMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
