interface NarrativeInput {
  symbol: string;
  rsi: number;
  momentum: number;
  trend: string;
}

function getTone(momentum: number): 'bullish' | 'bearish' | 'neutral' {
  if (momentum > 0.6) return 'bullish';
  if (momentum < 0.45) return 'bearish';
  return 'neutral';
}

function fallbackNarrative(input: NarrativeInput): string {
  const tone = getTone(input.momentum);
  return `${input.symbol} is showing ${tone} pressure with RSI at ${input.rsi.toFixed(1)} and a ${input.trend} trend. Watch for confirmation on sustained volume before sizing up.`;
}

function buildPrompt(input: NarrativeInput): string {
  return [
    'You are a concise market analyst assistant.',
    'Write exactly 2 short sentences.',
    'Keep it practical and avoid financial advice language.',
    `Symbol: ${input.symbol}`,
    `RSI: ${input.rsi.toFixed(2)}`,
    `Momentum score (0-1): ${input.momentum.toFixed(3)}`,
    `Trend: ${input.trend}`,
    'Include one risk-aware watchout in the second sentence.',
  ].join('\n');
}

function parseGeminiText(payload: unknown): string | null {
  const body = payload as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  return body.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

export const narrativeEngine = {
  async generate(input: NarrativeInput): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    if (!apiKey) {
      return fallbackNarrative(input);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: buildPrompt(input) }],
              },
            ],
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 150,
            },
          }),
        }
      );

      if (!response.ok) {
        return fallbackNarrative(input);
      }

      const data = (await response.json()) as unknown;
      return parseGeminiText(data) || fallbackNarrative(input);
    } catch {
      return fallbackNarrative(input);
    }
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