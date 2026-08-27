/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        brand: {
          primary: '#059669',    // Emerald 600
          hover: '#047857',      // Emerald 700
          light: '#ECFDF5',      // Emerald 50
          teal: '#0D9488',       // Teal 600
          accent: '#0284C7',     // Sky 600
        },
        medical: {
          bg: '#F8FAFC',         // Clean slate off-white
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          heading: '#0F172A',
        },
        badge: {
          blue: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
          green: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
          purple: { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
          orange: { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5' },
          red: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'health-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.03), 0 1px 6px -1px rgba(15, 23, 42, 0.02)',
        'health-md': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.03)',
        'health-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        'health': '0.75rem',
      }
    },
  },
  plugins: [],
}
