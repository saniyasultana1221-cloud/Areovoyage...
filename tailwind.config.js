/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // Deep Rich Espresso & Mocha Browns
          brown: {
            50: '#FDF8F5',
            100: '#F7EFE9',
            200: '#EEDACD',
            300: '#DFBDAB',
            400: '#C79A7F',
            500: '#A77757',
            600: '#8A5938',
            700: '#6E4225',
            800: '#4D2B14',
            900: '#2F170A',
            950: '#1C0C04',
          },
          // Soft Velvet Creams & Warm Ivories
          cream: {
            50: '#FDFCF9',
            100: '#F9F5EC',
            200: '#F3EBD9',
            300: '#EADDC3',
            400: '#DEC9A3',
            500: '#CEB280',
            600: '#BA9B65',
            700: '#9C7F4E',
            800: '#7E643C',
            900: '#5C482A',
          },
          // Rich Cognac & Caramel Gold Accents
          cognac: {
            DEFAULT: '#8C5835',
            light: '#A76F46',
            dark: '#6E3F1F',
          },
          caramel: '#B87D4B',
          espresso: '#1F100B',
          mocha: '#382014',
          sand: '#EBE2D5',
        },
        // Bright & Aesthetic Designer Accent Palettes
        spatial: {
          dark: '#080C14',
          surface: '#0F172A',
          card: 'rgba(15, 23, 42, 0.65)',
          amber: {
            DEFAULT: '#F59E0B',
            glow: '#FBBF24',
            dark: '#B45309',
          },
          coral: {
            DEFAULT: '#FF5C5C',
            glow: '#FF7D7D',
            dark: '#D92D20',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            glow: '#22D3EE',
            dark: '#0891B2',
          },
          emerald: {
            DEFAULT: '#10B981',
            glow: '#34D399',
            dark: '#059669',
          },
          violet: {
            DEFAULT: '#8B5CF6',
            glow: '#A78BFA',
            dark: '#6D28D9',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'brown': '0 10px 25px -5px rgba(47, 23, 10, 0.25), 0 8px 10px -6px rgba(47, 23, 10, 0.2)',
        'cream': '0 4px 20px -2px rgba(186, 155, 101, 0.15)',
        'cognac': '0 8px 25px -4px rgba(140, 88, 53, 0.35)',
        'card': '0 4px 20px -2px rgba(47, 23, 10, 0.06), 0 2px 6px -1px rgba(47, 23, 10, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(47, 23, 10, 0.12), 0 10px 10px -5px rgba(47, 23, 10, 0.04)',
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        'glass-glow': '0 0 35px -5px rgba(245, 158, 11, 0.3), 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
        'glass-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.3), 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
        'glass-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.3), 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
        'glass-violet': '0 0 35px -5px rgba(139, 92, 246, 0.3), 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.6))' },
        },
      }
    },
  },
  plugins: [],
}
