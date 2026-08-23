import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '.theme-dark'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Source Sans 3', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#080c14',
          50: '#f6f8fb',
          100: '#eef2f7',
          200: '#d7e1ed',
          300: '#b2c4dc',
          400: '#86a1c5',
          500: '#6483af',
          600: '#4e6a94',
          700: '#3f5578',
          800: '#374763',
          900: '#0e1422',
          950: '#080c14',
        },
        obsidian: '#080c14',
        surface: {
          DEFAULT: '#0d131f',
          elevated: '#121a2b',
          card: '#0f1624',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        sea: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        },
        'sea-dark': '#0284c7',
        coral: '#f97316',
        mint: '#10b981',
        electric: '#6366f1',
        sunset: '#f59e0b',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.12), transparent 35%)',
        'subtle-radial': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14,165,233,0.15), transparent 70%)',
      },
      boxShadow: {
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'surface-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'terminal-elevated': '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        tickerScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out both',
        'ticker-scroll': 'tickerScroll 36s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
