'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, ArrowRight, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['BTC', 'ETH', 'AAPL', 'NVDA', 'TSLA', 'SOL', 'MSFT'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      fetchResults('');
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/market/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setSelectedIndex(0);
      }
    } catch {
      // Ignore error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) fetchResults(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen]);

  const handleSelectSymbol = (symbol: string) => {
    onClose();
    router.push(`/symbol/${symbol}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelectSymbol(results[selectedIndex].symbol);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 mx-4"
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search stocks, crypto, forex (e.g., AAPL, BTC, NVDA)..."
                className="w-full bg-transparent px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Popular Symbols Bar */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-4 py-2 text-xs dark:border-slate-800/50 dark:bg-slate-900/50 overflow-x-auto">
              <span className="flex items-center gap-1 font-semibold text-slate-400 shrink-0">
                <TrendingUp className="h-3.5 w-3.5 text-sea" /> Popular:
              </span>
              {POPULAR_SEARCHES.map((sym) => (
                <button
                  key={sym}
                  onClick={() => handleSelectSymbol(sym)}
                  className="rounded-md border border-slate-200/80 bg-white px-2 py-0.5 font-medium text-slate-600 transition hover:border-sea hover:text-sea dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 shrink-0"
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2">
              {loading ? (
                <div className="p-8 text-center text-sm text-slate-400">
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-sea border-t-transparent" />
                  <p className="mt-2">Searching markets...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No assets found for &quot;{query}&quot;. Try typing an exact symbol like AAPL, BTC, or SOL.
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <li key={`${item.symbol}-${idx}`}>
                        <button
                          onClick={() => handleSelectSymbol(item.symbol)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                            isSelected
                              ? 'bg-sea/10 text-sea dark:bg-sea/20'
                              : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold text-xs ${
                                item.type === 'Crypto'
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                  : 'bg-sea/15 text-sea'
                              }`}
                            >
                              {item.symbol.slice(0, 4)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{item.symbol}</span>
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {item.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="hidden text-xs text-slate-400 sm:inline">
                              {item.region}
                            </span>
                            <ArrowRight
                              className={`h-4 w-4 transition ${
                                isSelected ? 'opacity-100 translate-x-0.5' : 'opacity-0'
                              }`}
                            />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Press Enter to select
              </span>
              <span>Use ↑ ↓ to navigate</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
