import axios from 'axios';

interface MarketDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

type AssetType = 'crypto' | 'stock';

const COMMON_CRYPTO_SYMBOLS = new Set([
  'BTC',
  'ETH',
  'SOL',
  'BNB',
  'XRP',
  'ADA',
  'DOGE',
  'AVAX',
  'DOT',
  'MATIC',
]);

function inferAssetType(symbol: string): AssetType {
  const clean = symbol.trim().toUpperCase();
  if (clean.endsWith('USDT') || COMMON_CRYPTO_SYMBOLS.has(clean)) {
    return 'crypto';
  }

  return 'stock';
}

function mapSymbolToBinance(symbol: string): string {
  const clean = symbol.trim().toUpperCase();
  if (clean.endsWith('USDT')) return clean;
  return `${clean}USDT`;
}

function syntheticSeries(symbol: string, points = 80): MarketDataPoint[] {
  const now = Math.floor(Date.now() / 1000);
  const type = inferAssetType(symbol);
  const base = type === 'stock' ? 180 : symbol === 'ETH' ? 3200 : 64000;

  return Array.from({ length: points }).map((_, idx) => {
    const drift = Math.sin(idx / 6) * 0.015;
    const open = base * (1 + drift + idx * 0.0007);
    const close = open * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, close) * (1 + Math.random() * 0.004);
    const low = Math.min(open, close) * (1 - Math.random() * 0.004);

    return {
      time: now - (points - idx) * 60,
      open,
      high,
      low,
      close,
      volume: Math.random() * 10000,
    };
  });
}

function sma(values: number[], period: number): number {
  if (values.length < period) return values[values.length - 1] || 0;
  const slice = values.slice(-period);
  return slice.reduce((acc, cur) => acc + cur, 0) / slice.length;
}

export const dataIngestionService = {
  async getMarketData(symbol: string, assetType?: AssetType): Promise<MarketDataPoint[]> {
    const type = assetType || inferAssetType(symbol);

    if (type === 'stock') {
      return this.getStockMarketData(symbol);
    }

    return this.getCryptoMarketData(symbol);
  },

  async getCryptoMarketData(symbol: string): Promise<MarketDataPoint[]> {
    const pair = mapSymbolToBinance(symbol);

    try {
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol: pair,
          interval: '1m',
          limit: 120,
        },
        timeout: 5000,
      });

      const candles = (response.data as Array<Array<string | number>>).map((kline) => ({
        time: Math.floor(Number(kline[0]) / 1000),
        open: Number(kline[1]),
        high: Number(kline[2]),
        low: Number(kline[3]),
        close: Number(kline[4]),
        volume: Number(kline[5]),
      }));

      return candles;
    } catch {
      return syntheticSeries(symbol);
    }
  },

  async getStockMarketData(symbol: string): Promise<MarketDataPoint[]> {
    const key = process.env.ALPHA_VANTAGE_KEY;
    if (!key) {
      return syntheticSeries(symbol);
    }

    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: symbol.toUpperCase(),
          interval: '5min',
          outputsize: 'compact',
          apikey: key,
        },
        timeout: 6000,
      });

      const series = response.data?.['Time Series (5min)'] as
        | Record<string, Record<string, string>>
        | undefined;

      if (!series) {
        return syntheticSeries(symbol);
      }

      const candles = Object.entries(series)
        .map(([time, values]) => ({
          time: Math.floor(new Date(time).getTime() / 1000),
          open: Number(values['1. open']),
          high: Number(values['2. high']),
          low: Number(values['3. low']),
          close: Number(values['4. close']),
          volume: Number(values['5. volume']),
        }))
        .sort((a, b) => a.time - b.time);

      return candles.length ? candles : syntheticSeries(symbol);
    } catch {
      return syntheticSeries(symbol);
    }
  },

  async getIndicators(symbol: string, assetType?: AssetType) {
    const candles = await this.getMarketData(symbol, assetType);
    const closes = candles.map((c) => c.close);

    const fast = sma(closes, 9);
    const slow = sma(closes, 21);
    const momentum = slow === 0 ? 0.5 : Math.min(1, Math.max(0, fast / slow));

    const last = closes[closes.length - 1] || 0;
    const prev = closes[closes.length - 2] || last;
    const priceDelta = prev === 0 ? 0 : (last - prev) / prev;

    return {
      rsi: 50 + Math.max(-20, Math.min(20, priceDelta * 1000)),
      momentum,
      trend: fast > slow ? 'up' : 'down',
    };
  },

  async getLatestCandle(symbol: string, assetType?: AssetType): Promise<MarketDataPoint> {
    const candles = await this.getMarketData(symbol, assetType);
    return candles[candles.length - 1];
  },
};