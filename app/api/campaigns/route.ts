import { NextResponse } from "next/server";
import { fetchCampaigns } from "@/lib/analytics/fetchAdData";

export async function GET() {
  try {
    const campaigns = await fetchCampaigns();
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
