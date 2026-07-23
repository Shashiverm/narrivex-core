import { NextRequest, NextResponse } from 'next/server';

interface SymbolMatch {
  symbol: string;
  name: string;
  type: string;
  region: string;
}

const cache = new Map<string, { timestamp: number; data: SymbolMatch[] }>();
const CACHE_TTL = 30 * 60 * 1000;

const POPULAR_SYMBOLS: SymbolMatch[] = [
  { symbol: 'BTC', name: 'Bitcoin', type: 'Crypto', region: 'Global' },
  { symbol: 'ETH', name: 'Ethereum', type: 'Crypto', region: 'Global' },
  { symbol: 'SOL', name: 'Solana', type: 'Crypto', region: 'Global' },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Equity', region: 'United States' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Equity', region: 'United States' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Equity', region: 'United States' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'Forex', region: 'Global' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q) {
    return NextResponse.json(POPULAR_SYMBOLS);
  }

  const queryKey = q.toLowerCase();
  const cached = cache.get(queryKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  let results: SymbolMatch[] = [];

  if (apiKey) {
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(q)}&apikey=${apiKey}`,
        { next: { revalidate: 1800 } }
      );
      if (res.ok) {
        const json = await res.json();
        const matches = json.bestMatches || [];
        results = matches.map((item: Record<string, string>) => ({
          symbol: item['1. symbol'],
          name: item['2. name'],
          type: item['3. type'],
          region: item['4. region'],
        }));
      }
    } catch {
      // Fallback
    }
  }

  if (results.length === 0) {
    results = POPULAR_SYMBOLS.filter(
      (item) =>
        item.symbol.toLowerCase().includes(queryKey) ||
        item.name.toLowerCase().includes(queryKey)
    );
    if (results.length === 0) {
      results.push({
        symbol: q.toUpperCase(),
        name: `${q.toUpperCase()} Asset`,
        type: q.length <= 4 ? 'Equity' : 'Crypto',
        region: 'Global',
      });
    }
  }

  cache.set(queryKey, { timestamp: Date.now(), data: results });
  return NextResponse.json(results);
}
