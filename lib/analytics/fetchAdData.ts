import { Campaign, DailyMetric } from "@/types/analytics";

/**
 * Fetches products from DummyJSON and transforms them into synthetic ad campaigns.
 */
export async function fetchCampaigns(): Promise<Campaign[]> {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=10');
    const data = await res.json();

    return data.products.map((product: any) => {
      const impressions = Math.floor(Math.random() * 50000) + 10000;
      const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
      const conversions = Math.floor(clicks * (Math.random() * 0.1 + 0.02));
      const spend = parseFloat((product.price * (Math.random() * 5 + 2)).toFixed(2));
      
      const ctr = (clicks / impressions) * 100;
      const cpc = spend / clicks;
      const revenue = conversions * product.price * 1.5;
      const roas = revenue / spend;

      return {
        id: product.id.toString(),
        name: `Campaign: ${product.title}`,
        status: Math.random() > 0.2 ? 'active' : 'paused',
        budget: product.price * 50,
        spend,
        impressions,
        clicks,
        conversions,
        ctr,
        cpc,
        roas,
        startDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      };
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

/**
 * Generates synthetic daily metrics for the last 30 days.
 */
export async function fetchDailyMetrics(): Promise<DailyMetric[]> {
  const metrics: DailyMetric[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    metrics.push({
      date: date.toISOString().split('T')[0],
      spend: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 10000) + 2000,
      clicks: Math.floor(Math.random() * 500) + 50,
      conversions: Math.floor(Math.random() * 50) + 5,
    });
  }

  return metrics;
}
