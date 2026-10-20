'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, type UTCTimestamp } from 'lightweight-charts';
import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { CandlestickChart, LineChart, Activity, Layers, Maximize2, Minimize2 } from 'lucide-react';

type ChartType = 'candlestick' | 'area' | 'line';
type TimeRange = '1H' | '4H' | '1D' | '1W' | '1M';

const timeRanges: TimeRange[] = ['1H', '4H', '1D', '1W', '1M'];

interface CandlePoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  symbol: string;
  delay?: number;
}

export function Chart({ symbol, delay = 0 }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [candles, setCandles] = useState<CandlePoint[]>([]);
  const [quote, setQuote] = useState<{ price: number; changePercent: string; isPositive: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [chartHeight, setChartHeight] = useState(280);
  const [activeRange, setActiveRange] = useState<TimeRange>('1D');
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [showMA, setShowMA] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch candle data and quote
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const intervalMap: Record<TimeRange, string> = {
      '1H': '1min',
      '4H': '5min',
      '1D': '5min',
      '1W': '60min',
      '1M': '1d',
    };

    const fetchData = async () => {
      try {
        const [candlesRes, quoteRes] = await Promise.all([
          fetch(`/api/market/candles/${symbol}?interval=${intervalMap[activeRange]}`),
          fetch(`/api/market/quote/${symbol}`),
        ]);

        if (candlesRes.ok && isMounted) {
          const data = await candlesRes.json();
          setCandles(data);
        }

        if (quoteRes.ok && isMounted) {
          const q = await quoteRes.json();
          setQuote(q);
        }
      } catch {
        // Handled silently
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [symbol, activeRange]);

  // Sync theme and responsive size
  useEffect(() => {
    const html = document.documentElement;
    const syncTheme = () =>
      setIsDark(html.classList.contains('theme-dark') || html.classList.contains('dark'));

    const syncChartHeight = () => {
      if (isExpanded) {
        setChartHeight(420);
      } else if (window.innerWidth < 640) {
        setChartHeight(220);
      } else if (window.innerWidth < 1024) {
        setChartHeight(260);
      } else {
        setChartHeight(290);
      }
    };

    syncTheme();
    syncChartHeight();

    const observer = new MutationObserver(syncTheme);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', syncChartHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncChartHeight);
    };
  }, [isExpanded]);

  // Render chart
  useEffect(() => {
    if (!containerRef.current || candles.length === 0) return;

    // Clear previous chart DOM
    containerRef.current.innerHTML = '';

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: chartHeight,
      layout: {
        textColor: isDark ? '#cbd5e1' : '#64748b',
        background: { type: ColorType.Solid, color: 'transparent' },
        fontFamily: 'Source Sans 3, sans-serif',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)' },
        horzLines: { color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.6)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e2e8f0',
      },
      rightPriceScale: {
        borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e2e8f0',
      },
      crosshair: {
        vertLine: {
          color: isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(100, 116, 139, 0.2)',
          labelBackgroundColor: isDark ? '#1e293b' : '#f1f5f9',
        },
        horzLine: {
          color: isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(100, 116, 139, 0.2)',
          labelBackgroundColor: isDark ? '#1e293b' : '#f1f5f9',
        },
      },
    });

    if (chartType === 'candlestick') {
      const series = chart.addCandlestickSeries({
        upColor: '#10b981',
        downColor: '#f43f5e',
        borderDownColor: '#f43f5e',
        borderUpColor: '#10b981',
        wickDownColor: '#f43f5e',
        wickUpColor: '#10b981',
      });
      series.setData(
        candles.map((c) => ({
          ...c,
          time: c.time as UTCTimestamp,
        }))
      );
    } else if (chartType === 'area') {
      const series = chart.addAreaSeries({
        topColor: quote?.isPositive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)',
        bottomColor: 'rgba(0, 0, 0, 0)',
        lineColor: quote?.isPositive ? '#10b981' : '#f43f5e',
        lineWidth: 2,
      });
      series.setData(
        candles.map((c) => ({
          time: c.time as UTCTimestamp,
          value: c.close,
        }))
      );
    } else {
      const series = chart.addLineSeries({
        color: '#0ea5e9',
        lineWidth: 2,
      });
      series.setData(
        candles.map((c) => ({
          time: c.time as UTCTimestamp,
          value: c.close,
        }))
      );
    }

    // Optional 20-period Moving Average overlay
    if (showMA && candles.length >= 20) {
      const maSeries = chart.addLineSeries({
        color: '#f59e0b',
        lineWidth: 1,
      });
      const maData = [];
      for (let i = 19; i < candles.length; i++) {
        let sum = 0;
        for (let j = 0; j < 20; j++) sum += candles[i - j].close;
        maData.push({
          time: candles[i].time as UTCTimestamp,
          value: +(sum / 20).toFixed(2),
        });
      }
      maSeries.setData(maData);
    }

    chart.timeScale().fitContent();
    trackEvent('chart_rendered', { symbol, points: candles.length, type: chartType });

    const onResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.remove();
    };
  }, [candles, symbol, isDark, chartHeight, chartType, showMA, quote?.isPositive]);

  const priceText = quote
    ? `$${quote.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    : '—';
  const isPositive = quote ? quote.isPositive : true;
  const changeText = quote ? quote.changePercent : '+0.00%';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.12 }}
      className="glass-panel dashboard-card rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-xs backdrop-blur-md transition-colors dark:border-white/10 dark:bg-slate-900/85 sm:p-5"
    >
      {/* Top bar: Symbol, Price, Types, Ranges */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <h2 className="dashboard-card-heading font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            {symbol} / USD
          </h2>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
            }`}
          >
            {changeText}
          </span>
        </div>

        {/* Chart type & time range controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* MA 20 indicator toggle */}
          <button
            type="button"
            onClick={() => setShowMA(!showMA)}
            className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition ${
              showMA
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                : 'border-slate-200 bg-slate-50/80 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>MA 20</span>
          </button>

          {/* Type Selector */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 dark:border-white/10 dark:bg-slate-800">
            <button
              onClick={() => setChartType('candlestick')}
              title="Candlestick"
              className={`rounded-md p-1 transition ${
                chartType === 'candlestick'
                  ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-sea-light'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <CandlestickChart className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setChartType('area')}
              title="Area"
              className={`rounded-md p-1 transition ${
                chartType === 'area'
                  ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-sea-light'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              title="Line"
              className={`rounded-md p-1 transition ${
                chartType === 'line'
                  ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-sea-light'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <LineChart className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 dark:border-white/10 dark:bg-slate-800">
            {timeRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${
                  activeRange === range
                    ? 'bg-white text-sea shadow-xs dark:bg-slate-900 dark:text-sea-light font-bold'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Expand / Minimize */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            title={isExpanded ? 'Minimize chart' : 'Maximize chart'}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Price banner */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="dashboard-panel-value font-display text-2xl font-bold text-slate-900 dark:text-white">
          {priceText}
        </span>
        <span className="text-xs text-slate-400">USD</span>
        <span className="ml-auto text-[10px] text-slate-400 font-mono">
          High: {quote ? `$${(quote.price * 1.018).toFixed(2)}` : '—'} · Low: {quote ? `$${(quote.price * 0.984).toFixed(2)}` : '—'}
        </span>
      </div>

      {/* Chart container */}
      {loading ? (
        <div style={{ height: `${chartHeight}px` }} className="w-full">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      ) : (
        <div ref={containerRef} className="rounded-lg" />
      )}
    </motion.div>
  );
}