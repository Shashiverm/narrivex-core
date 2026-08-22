'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'AI Engine' | 'Latency & Data' | 'Enterprise & API';
}

const faqList: FaqItem[] = [
  {
    question: 'How is Narrivex different from standard price alert bots?',
    answer:
      'Standard bots only trigger when a threshold is crossed (e.g. "BTC up 3%"), forcing you to frantically check news feeds, Twitter/X, and order books. Narrivex synthesizes the exact reason behind the move—analyzing liquidations, dark pool block flows, SEC filings, and cross-market lead-lag dynamics in under 50ms.',
    category: 'General',
  },
  {
    question: 'How does Narrivex generate narratives so quickly without hallucinating?',
    answer:
      'We run a dual-tier quantitative-to-LLM architecture. Statistical outlier engines first isolate mathematical anomalies (volume z-score > 3.2, CVD divergences, liquidation cascades). Only grounded, structured telemetry is passed into our fine-tuned financial models, ensuring deterministic grounding without hallucinations.',
    category: 'AI Engine',
  },
  {
    question: 'Which markets and exchanges are natively supported?',
    answer:
      'We monitor 120+ top liquidity venues globally: Major Crypto exchanges (Binance, Coinbase Pro, Bybit, OKX, Hyperliquid, DEX mempools on Solana and Ethereum), US Equities (NYSE, NASDAQ, CME futures, Dark Pools), Forex (G10 interbank pairs), and Commodities (Gold, Silver, Crude Oil).',
    category: 'Latency & Data',
  },
  {
    question: 'Can I integrate Narrivex alerts into my automated trading bots or webhooks?',
    answer:
      'Yes. Professional and Enterprise tiers include full access to our sub-50ms WebSocket streaming API, customizable HTTP Webhooks, and REST endpoints. You can ingest structured JSON alerts with AI narrative payloads directly into your execution pipelines.',
    category: 'Enterprise & API',
  },
  {
    question: 'Does Narrivex execute trades or provide financial advice?',
    answer:
      'No. Narrivex is strictly an informational analytics platform and AI intelligence software. We do not manage funds, execute trades, or provide investment advice. Traders use our intelligence layer to augment their own research and execution decisions.',
    category: 'General',
  },
  {
    question: 'What is the 7-day free trial policy?',
    answer:
      'Every new account receives unrestricted access to our live real-time feeds and AI synthesis for 7 days. You can cancel with a single click at any time before the trial ends without being charged.',
    category: 'General',
  },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'AI Engine', 'Latency & Data', 'Enterprise & API'];

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="mb-24">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 font-mono text-xs font-semibold text-sea">
          <HelpCircle className="h-3.5 w-3.5" />
          Frequently Asked Questions
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900 dark:text-white">
          Institutional Clarifications & Architecture
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Everything you need to know about our data feeds, AI reasoning model, and latency guarantees.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. latency, API, hallucination)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-sea focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-950/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Items */}
      <div className="mx-auto max-w-3xl space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            No matching questions found for &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredFaqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-xs transition dark:border-slate-800/80 dark:bg-slate-900/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`rounded-lg p-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-sea/15 text-sea' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 dark:border-slate-800/60">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
                      {item.answer}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                      <Sparkles className="h-3 w-3 text-sea" />
                      <span>Category: {item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
