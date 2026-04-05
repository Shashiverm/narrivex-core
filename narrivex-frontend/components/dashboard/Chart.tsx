'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, type CandlestickData, type UTCTimestamp } from 'lightweight-charts';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function Chart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useRealtimeData(symbol);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 340,
      layout: {
        textColor: '#1f2937',
        background: { type: ColorType.Solid, color: '#ffffff' },
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
  }, [data]);

  return (
    <Card className="bg-white p-5">
      <h2 className="mb-4 font-display text-xl font-bold">{symbol}</h2>
      {loading ? <Skeleton className="h-[340px] w-full" /> : <div ref={containerRef} />}
    </Card>
  );
}