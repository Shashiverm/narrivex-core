'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketTickerItem {
  symbol: string;
  price: string;
  move: string;
  positive: boolean;
}

const DEFAULT_ITEMS: MarketTickerItem[] = [
  { symbol: 'BTC', price: '$68,047', move: '+2.4%', positive: true },
  { symbol: 'ETH', price: '$3,892', move: '+1.1%', positive: true },
  { symbol: 'S&P 500', price: '5,432', move: '+0.3%', positive: true },
  { symbol: 'AAPL', price: '$192.40', move: '-0.8%', positive: false },
  { symbol: 'NVDA', price: '$875.20', move: '+2.6%', positive: true },
  { symbol: 'SOL', price: '$147.80', move: '+4.2%', positive: true },
  { symbol: 'GOLD', price: '$2,418', move: '+0.5%', positive: true },
  { symbol: 'EUR/USD', price: '1.0842', move: '-0.1%', positive: false },
];

export function MarketOverview() {
  const [items, setItems] = useState<MarketTickerItem[]>(DEFAULT_ITEMS);

  useEffect(() => {
    let isMounted = true;

    const fetchMovers = async () => {
      try {
        const res = await fetch('/api/market/movers');
        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        }
      } catch {
        // Handled silently
      }
    };

    fetchMovers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel market-ticker rounded-2xl px-4 py-3"
    >
      <div className="flex animate-ticker-scroll gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="inline-flex items-center gap-3">
            <span className="text-sm font-bold text-slate-800 dashboard-card-heading dark:text-slate-200">
              {item.symbol}
            </span>
            <span className="text-sm font-medium text-slate-600 dashboard-card-text dark:text-slate-400">
              {item.price}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                item.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
              }`}
            >
              {item.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.move}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
