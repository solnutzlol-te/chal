import tailwindAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Doodle/Crayon Style Pastel Colors
        'sky': {
          DEFAULT: 'hsl(200, 70%, 85%)',
          light: 'hsl(200, 80%, 90%)',
          dark: 'hsl(200, 60%, 75%)',
        },
        'pastel-pink': {
          DEFAULT: 'hsl(350, 100%, 85%)',
          light: 'hsl(350, 100%, 90%)',
          dark: 'hsl(350, 100%, 75%)',
        },
        'pastel-green': {
          DEFAULT: 'hsl(120, 50%, 85%)',
          light: 'hsl(120, 50%, 90%)',
          dark: 'hsl(120, 50%, 75%)',
        },
        'pastel-yellow': {
          DEFAULT: 'hsl(55, 100%, 85%)',
          light: 'hsl(55, 100%, 90%)',
          dark: 'hsl(55, 100%, 75%)',
        },
        'pastel-purple': {
          DEFAULT: 'hsl(280, 60%, 85%)',
          light: 'hsl(280, 60%, 90%)',
          dark: 'hsl(280, 60%, 75%)',
        },
        'pastel-orange': {
          DEFAULT: 'hsl(25, 100%, 85%)',
          light: 'hsl(25, 100%, 90%)',
          dark: 'hsl(25, 100%, 75%)',
        },
        'doodle-black': {
          DEFAULT: 'hsl(0, 0%, 10%)',
          light: 'hsl(0, 0%, 20%)',
        },
        'doodle-brown': {
          DEFAULT: 'hsl(30, 25%, 60%)',
          dark: 'hsl(30, 25%, 50%)',
        },
        // Keep original tokens for shadcn components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'doodle': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'doodle-2': '70% 30% 30% 70% / 70% 70% 30% 30%',
      },
      fontFamily: {
        'handwritten': ['"Comic Neue"', '"Comic Sans MS"', 'cursive'],
        'marker': ['"Permanent Marker"', 'cursive'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
