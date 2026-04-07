'use client';

import { useEffect } from 'react';
import { useNarrative } from '@/hooks/useNarrative';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';

export function Narrative({ symbol }: { symbol: string }) {
  const { narrative, loading } = useNarrative(symbol);

  useEffect(() => {
    trackEvent('narrative_panel_view', { symbol });
  }, [symbol]);

  if (loading) {
    return (
      <Card className="bg-white p-5">
        <Skeleton className="h-28 w-full" />
      </Card>
    );
  }

  return (
    <Card className="space-y-3 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Narrative</h3>
        <Badge className="capitalize">{narrative?.sentiment || 'neutral'}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{narrative?.text || 'No narrative available yet.'}</p>
    </Card>
  );
}