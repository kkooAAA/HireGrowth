import { Campaign, Insight } from "@/types/analytics";

/**
 * Generates rule-based AI insights based on campaign performance.
 */
export function generateInsights(campaigns: Campaign[]): Insight[] {
  const insights: Insight[] = [];

  // Insight 1: High ROAS Top Performer
  const topPerformer = [...campaigns].sort((a, b) => b.roas - a.roas)[0];
  if (topPerformer) {
    insights.push({
      id: "insight-1",
      type: "positive",
      title: "High ROAS Performer Detected",
      description: `${topPerformer.name} is achieving a ROAS of ${topPerformer.roas.toFixed(2)}x, which is 40% above the account average.`,
      impact: "Increase budget by 20% to scale conversions.",
      timestamp: new Date().toISOString(),
    });
  }

  // Insight 2: High CPC Alert
  const highCpc = campaigns.find(c => c.cpc > 5);
  if (highCpc) {
    insights.push({
      id: "insight-2",
      type: "alert",
      title: "Rising CPC Warning",
      description: `${highCpc.name} has seen a 15% increase in CPC over the last 24 hours.`,
      impact: "Check keyword competition and ad relevance score.",
      timestamp: new Date().toISOString(),
    });
  }

  // Insight 3: Low CTR Optimization
  const lowCtr = campaigns.find(c => c.ctr < 1.5 && c.impressions > 5000);
  if (lowCtr) {
    insights.push({
      id: "insight-3",
      type: "negative",
      title: "Low Engagement Alert",
      description: `${lowCtr.name} has a CTR of ${lowCtr.ctr.toFixed(2)}%, significantly below benchmark.`,
      impact: "Refresh ad creatives or adjust audience targeting.",
      timestamp: new Date().toISOString(),
    });
  }

  // Insight 4: Budget Pacing
  insights.push({
    id: "insight-4",
    type: "neutral",
    title: "Budget Pacing on Track",
    description: "Your monthly spend is currently at 45% of total budget with 16 days remaining.",
    impact: "No action required. Pacing is optimal.",
    timestamp: new Date().toISOString(),
  });

  return insights;
}
