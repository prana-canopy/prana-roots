import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'wing-flap-left': 'wing-flap-left 2s infinite ease-in-out',
        'wing-flap-right': 'wing-flap-right 2s infinite ease-in-out',
        'hover': 'hover 2s infinite ease-in-out',
        'glow': 'glow 2s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out',
      },
      keyframes: {
        'wing-flap-left': {
          '0%, 100%': { 
            transform: 'rotateY(-15deg) rotateX(5deg) translateX(-5px) translateZ(20px)'
          },
          '50%': { 
            transform: 'rotateY(10deg) rotateX(-5deg) translateX(2px) translateZ(20px)'
          }
        },
        'wing-flap-right': {
          '0%, 100%': { 
            transform: 'rotateY(15deg) rotateX(5deg) translateX(5px) translateZ(20px)'
          },
          '50%': { 
            transform: 'rotateY(-10deg) rotateX(-5deg) translateX(-2px) translateZ(20px)'
          }
        },
        hover: {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(var(--tw-scale-x))' 
          },
          '50%': { 
            transform: 'translateY(-15px) scale(var(--tw-scale-x))' 
          }
        },
        glow: {
          '0%, 100%': {
            filter: 'brightness(1) blur(0px)',
            boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000'
          },
          '50%': {
            filter: 'brightness(1.5) blur(1px)',
            boxShadow: '0 0 15px #ff0000, 0 0 30px #ff0000'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      }
    },
  },
  plugins: [],
} satisfies Config;