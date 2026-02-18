/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        throttle: {
          red: '#E10600',
          'red-hover': '#B30500',
          'bg-main': '#050505',
          'bg-card': '#0A0A0A',
          'bg-secondary': '#121212',
          border: '#262626',
          'text-primary': '#F5F5F5',
          'text-secondary': '#A3A3A3',
          'text-muted': '#525252',
          'neon-green': '#CCFF00',
          carbon: '#1C1C1C',
          glass: 'rgba(255, 255, 255, 0.03)',
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'Oswald', 'sans-serif'],
        body: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};