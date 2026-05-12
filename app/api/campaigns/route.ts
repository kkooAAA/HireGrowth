import { NextResponse } from "next/server";
import { fetchCampaigns } from "@/lib/analytics/fetchAdData";
import { getCachedData } from "@/lib/cache";

export async function GET() {
  try {
    const campaigns = await getCachedData("campaigns", fetchCampaigns);
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
