import { NextResponse } from 'next/server';

interface MoverItem {
  symbol: string;
  move: string;
  sentiment: string;
  price: string;
  positive: boolean;
}

let cache: { timestamp: number; data: MoverItem[] } | null = null;
const CACHE_TTL = 30 * 60 * 1000;

const FALLBACK_MOVERS: MoverItem[] = [
  { symbol: 'BTC', move: '+3.4%', sentiment: 'Bullish', price: '$68,047', positive: true },
  { symbol: 'NVDA', move: '+2.6%', sentiment: 'Bullish', price: '$875.20', positive: true },
  { symbol: 'ETH', move: '+1.1%', sentiment: 'Neutral', price: '$3,892', positive: true },
  { symbol: 'TSLA', move: '+4.8%', sentiment: 'Bullish', price: '$245.50', positive: true },
  { symbol: 'AAPL', move: '-0.8%', sentiment: 'Cautious', price: '$192.40', positive: false },
  { symbol: 'AMD', move: '-1.5%', sentiment: 'Bearish', price: '$162.10', positive: false },
];

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  if (apiKey) {
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
        { next: { revalidate: 1800 } }
      );
      if (res.ok) {
        const json = await res.json();
        const topGainers = (json.top_gainers || []).slice(0, 4);
        const topLosers = (json.top_losers || []).slice(0, 2);
        const combined = [...topGainers, ...topLosers];

        if (combined.length > 0) {
          const formatted: MoverItem[] = combined.map((item: Record<string, string>) => {
            const changePct = item.change_percentage || '0%';
            const positive = !changePct.startsWith('-');
            return {
              symbol: item.ticker,
              move: changePct,
              sentiment: positive ? 'Bullish' : 'Bearish',
              price: `$${Number(item.price).toFixed(2)}`,
              positive,
            };
          });

          cache = { timestamp: Date.now(), data: formatted };
          return NextResponse.json(formatted);
        }
      }
    } catch {
      // Fallback
    }
  }

  cache = { timestamp: Date.now(), data: FALLBACK_MOVERS };
  return NextResponse.json(FALLBACK_MOVERS);
}
