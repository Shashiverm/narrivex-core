import { NextRequest, NextResponse } from 'next/server';

export interface CandlePoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const cache = new Map<string, { timestamp: number; data: CandlePoint[] }>();
const CACHE_TTL = 5 * 60 * 1000;

const CRYPTO_LIST = new Set(['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'MATIC']);

function isCrypto(symbol: string) {
  const clean = symbol.toUpperCase().trim();
  return clean.endsWith('USDT') || CRYPTO_LIST.has(clean);
}

function syntheticCandles(symbol: string, points = 60): CandlePoint[] {
  const now = Math.floor(Date.now() / 1000);
  const isC = isCrypto(symbol);
  const base = isC ? (symbol === 'ETH' ? 3850 : symbol === 'BTC' ? 68000 : 145) : 190;

  return Array.from({ length: points }).map((_, idx) => {
    const time = now - (points - idx) * 300;
    const wave = Math.sin(idx / 5) * (base * 0.015);
    const open = base + wave + (Math.random() - 0.5) * (base * 0.005);
    const close = open + (Math.random() - 0.48) * (base * 0.008);
    const high = Math.max(open, close) + Math.random() * (base * 0.004);
    const low = Math.min(open, close) - Math.random() * (base * 0.004);
    const volume = Math.floor(Math.random() * 50000 + 1000);

    return {
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    };
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const rawSymbol = params.symbol.toUpperCase().trim();
  const { searchParams } = new URL(request.url);
  const interval = searchParams.get('interval') || '5min';

  const cacheKey = `${rawSymbol}_${interval}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  // Binance Crypto candles
  if (isCrypto(rawSymbol)) {
    try {
      const pair = rawSymbol.endsWith('USDT') ? rawSymbol : `${rawSymbol}USDT`;
      const binanceInterval = interval === '1d' ? '1d' : interval === '60min' ? '1h' : '5m';
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${binanceInterval}&limit=90`,
        { next: { revalidate: 120 } }
      );
      if (res.ok) {
        const json = await res.json();
        const candles: CandlePoint[] = (json as Array<Array<string | number>>).map((k) => ({
          time: Math.floor(Number(k[0]) / 1000),
          open: Number(k[1]),
          high: Number(k[2]),
          low: Number(k[3]),
          close: Number(k[4]),
          volume: Number(k[5]),
        }));

        if (candles.length > 0) {
          cache.set(cacheKey, { timestamp: Date.now(), data: candles });
          return NextResponse.json(candles);
        }
      }
    } catch {
      // Fallback
    }
  }

  // Alpha Vantage Stock candles
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  if (apiKey) {
    try {
      const fn = interval === '1d' ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_INTRADAY';
      const url =
        fn === 'TIME_SERIES_DAILY'
          ? `https://www.alphavantage.co/query?function=${fn}&symbol=${encodeURIComponent(rawSymbol)}&outputsize=compact&apikey=${apiKey}`
          : `https://www.alphavantage.co/query?function=${fn}&symbol=${encodeURIComponent(rawSymbol)}&interval=${interval}&outputsize=compact&apikey=${apiKey}`;

      const res = await fetch(url, { next: { revalidate: 300 } });
      if (res.ok) {
        const json = await res.json();
        const timeSeriesKey = Object.keys(json).find((key) => key.includes('Time Series'));
        if (timeSeriesKey && json[timeSeriesKey]) {
          const series = json[timeSeriesKey] as Record<string, Record<string, string>>;
          const candles: CandlePoint[] = Object.entries(series)
            .map(([time, values]) => ({
              time: Math.floor(new Date(time).getTime() / 1000),
              open: Number(values['1. open']),
              high: Number(values['2. high']),
              low: Number(values['3. low']),
              close: Number(values['4. close']),
              volume: Number(values['5. volume']),
            }))
            .sort((a, b) => a.time - b.time);

          if (candles.length > 0) {
            cache.set(cacheKey, { timestamp: Date.now(), data: candles });
            return NextResponse.json(candles);
          }
        }
      }
    } catch {
      // Fallback
    }
  }

  const fallback = syntheticCandles(rawSymbol);
  cache.set(cacheKey, { timestamp: Date.now(), data: fallback });
  return NextResponse.json(fallback);
}
