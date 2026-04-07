'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import { trackEvent } from '@/lib/analytics';

export interface PriceData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function useRealtimeData(symbol: string) {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    trackEvent('chart_subscribe_attempt', { symbol });
    socket.emit('subscribe', symbol);

    const onInitialData = (initialData: PriceData[]) => {
      setData(initialData);
      setLoading(false);
      trackEvent('chart_initial_data_received', {
        symbol,
        points: initialData.length,
      });
    };

    const onPriceUpdate = (newData: PriceData) => {
      setData((prev) => [...prev.slice(-99), newData]);
    };

    socket.on('initial_data', onInitialData);
    socket.on(`price_update:${symbol}`, onPriceUpdate);

    return () => {
      socket.emit('unsubscribe', symbol);
      trackEvent('chart_unsubscribe', { symbol });
      socket.off('initial_data', onInitialData);
      socket.off(`price_update:${symbol}`, onPriceUpdate);
    };
  }, [symbol]);

  return { data, loading };
}