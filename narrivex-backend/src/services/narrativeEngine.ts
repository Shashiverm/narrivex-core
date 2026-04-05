interface NarrativeInput {
  symbol: string;
  rsi: number;
  momentum: number;
  trend: string;
}

export const narrativeEngine = {
  async generate(input: NarrativeInput): Promise<string> {
    const tone = input.momentum > 0.6 ? 'bullish' : input.momentum < 0.45 ? 'bearish' : 'neutral';
    return `${input.symbol} is showing ${tone} pressure with RSI at ${input.rsi.toFixed(1)} and a ${input.trend} trend. Watch for confirmation on sustained volume before sizing up.`;
  },

  extractSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
    if (text.includes('bullish')) return 'bullish';
    if (text.includes('bearish')) return 'bearish';
    return 'neutral';
  },

  extractConfidence(text: string): number {
    if (text.includes('Watch for confirmation')) return 0.67;
    return 0.55;
  },
};