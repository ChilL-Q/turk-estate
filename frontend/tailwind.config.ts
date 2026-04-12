import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:  '#005CE6',
          dark:  '#0B1426',
          light: '#F8FAFC',
          muted: '#64748B',
        },
      },
      boxShadow: {
        soft:         '0 4px 20px -2px rgba(0,0,0,0.06)',
        card:         '0 8px 32px -4px rgba(0,0,0,0.10)',
        'glass-light':'0 8px 32px 0 rgba(31,38,135,0.07)',
        glow:         '0 0 40px 0 rgba(0,92,230,0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,92,230,0.12) 0%, transparent 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition:  '800px 0' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.5s ease-out both',
        'fade-in':   'fade-in 0.4s ease-out both',
        'scale-in':  'scale-in 0.35s ease-out both',
        shimmer:     'shimmer 1.6s infinite linear',
      },
    },
  },
  plugins: [],
};
export default config;
