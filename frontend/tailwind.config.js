/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030712',
        card: '#111827',
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        success: '#22C55E',
        danger: '#EF4444',
        text: '#F9FAFB',
        muted: '#9CA3AF',
      },
      fontFamily: {
        display: ['"Clash Display"', '"Sora"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15), transparent 60%)',
        'aurora':
          'linear-gradient(120deg, #3B82F6 0%, #8B5CF6 45%, #06B6D4 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(59,130,246,0.45)',
        'glow-purple': '0 0 40px -8px rgba(139,92,246,0.45)',
        card: '0 8px 32px rgba(0,0,0,0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        scanline: 'scanline 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
