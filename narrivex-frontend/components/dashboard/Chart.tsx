'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, type CandlestickData, type UTCTimestamp } from 'lightweight-charts';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';

export function Chart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useRealtimeData(symbol);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const syncTheme = () => {
      setIsDark(html.classList.contains('theme-dark'));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    trackEvent('chart_panel_view', { symbol });
  }, [symbol]);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 340,
      layout: {
        textColor: isDark ? '#cbd5e1' : '#1f2937',
        background: { type: ColorType.Solid, color: isDark ? '#0f172a' : '#ffffff' },
      },
      grid: {
        vertLines: { color: isDark ? '#334155' : '#e2e8f0' },
        horzLines: { color: isDark ? '#334155' : '#e2e8f0' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    });

    const chartData: CandlestickData<UTCTimestamp>[] = data.map((candle) => ({
      ...candle,
      time: candle.time as UTCTimestamp,
    }));

    series.setData(chartData);
    chart.timeScale().fitContent();
    trackEvent('chart_rendered', { symbol, points: chartData.length });

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
  }, [data, symbol, isDark]);

  return (
    <Card className="dashboard-card bg-white p-5">
      <h2 className="dashboard-card-heading mb-4 font-display text-xl font-bold">{symbol}</h2>
      {loading ? <Skeleton className="h-[340px] w-full" /> : <div ref={containerRef} />}
    </Card>
  );
}