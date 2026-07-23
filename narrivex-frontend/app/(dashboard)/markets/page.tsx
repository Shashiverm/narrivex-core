'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketItem {
  symbol: string;
  name: string;
  category: 'Crypto' | 'Stock' | 'Forex';
  price: string;
  change: string;
  positive: boolean;
  volume: string;
}

const MARKET_ITEMS: MarketItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', category: 'Crypto', price: '$68,047', change: '+2.4%', positive: true, volume: '$32.4B' },
  { symbol: 'ETH', name: 'Ethereum', category: 'Crypto', price: '$3,892', change: '+1.1%', positive: true, volume: '$18.1B' },
  { symbol: 'SOL', name: 'Solana', category: 'Crypto', price: '$147.80', change: '+4.2%', positive: true, volume: '$4.2B' },
  { symbol: 'BNB', name: 'BNB Token', category: 'Crypto', price: '$580.10', change: '-0.4%', positive: false, volume: '$1.1B' },
  { symbol: 'AAPL', name: 'Apple Inc.', category: 'Stock', price: '$192.40', change: '-0.8%', positive: false, volume: '$8.2B' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', category: 'Stock', price: '$875.20', change: '+2.6%', positive: true, volume: '$14.8B' },
  { symbol: 'MSFT', name: 'Microsoft', category: 'Stock', price: '$415.30', change: '+0.9%', positive: true, volume: '$6.5B' },
  { symbol: 'TSLA', name: 'Tesla Inc', category: 'Stock', price: '$245.50', change: '+4.8%', positive: true, volume: '$9.1B' },
  { symbol: 'AMZN', name: 'Amazon.com', category: 'Stock', price: '$182.10', change: '+1.4%', positive: true, volume: '$5.4B' },
  { symbol: 'META', name: 'Meta Platforms', category: 'Stock', price: '$498.20', change: '+1.8%', positive: true, volume: '$4.9B' },
  { symbol: 'EUR/USD', name: 'Euro / Dollar', category: 'Forex', price: '1.0842', change: '-0.1%', positive: false, volume: '$120B' },
  { symbol: 'GBP/USD', name: 'Pound / Dollar', category: 'Forex', price: '1.2715', change: '+0.3%', positive: true, volume: '$85B' },
];

export default function MarketsPage() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = MARKET_ITEMS.filter((item) => {
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            Market Intelligence Explorer
          </h1>
          <p className="text-sm text-slate-500">
            Browse real-time price feeds & AI technical narratives for global equities & crypto assets.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {['All', 'Crypto', 'Stock', 'Forex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                filterCategory === cat
                  ? 'bg-sea text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name or symbol..."
            className="w-full rounded-xl border border-slate-200/80 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sea dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              href={`/symbol/${item.symbol}`}
              className="glass-panel group block rounded-2xl p-5 transition hover:-translate-y-1 hover:border-sea/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-display font-bold text-xs ${
                      item.category === 'Crypto'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-sea/15 text-sea'
                    }`}
                  >
                    {item.symbol.slice(0, 4)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-sea dark:text-slate-100">
                      {item.symbol}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.name}</p>
                  </div>
                </div>

                <ExternalLink className="h-4 w-4 text-slate-300 transition group-hover:text-sea" />
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400">PRICE</span>
                  <p className="font-display font-bold text-slate-900 dark:text-slate-100">
                    {item.price}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                      item.positive ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {item.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {item.change}
                  </span>
                  <p className="text-[10px] text-slate-400">24h Vol: {item.volume}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
