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
  const [chartHeight, setChartHeight] = useState(340);

  useEffect(() => {
    const html = document.documentElement;
    const syncTheme = () => {
      setIsDark(html.classList.contains('theme-dark'));
    };

    const syncChartHeight = () => {
      if (window.innerWidth < 640) {
        setChartHeight(240);
        return;
      }
      if (window.innerWidth < 1024) {
        setChartHeight(280);
        return;
      }
      setChartHeight(340);
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
  }, []);

  useEffect(() => {
    trackEvent('chart_panel_view', { symbol });
  }, [symbol]);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: chartHeight,
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
  }, [data, symbol, isDark, chartHeight]);

  return (
    <Card className="dashboard-card bg-white p-4 sm:p-5">
      <h2 className="dashboard-card-heading mb-3 font-display text-lg font-bold sm:mb-4 sm:text-xl">{symbol}</h2>
      {loading ? (
        <div style={{ height: `${chartHeight}px` }} className="w-full">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div ref={containerRef} />
      )}
    </Card>
  );
}