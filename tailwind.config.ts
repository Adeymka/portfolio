import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        "fb-blue": "var(--fb-blue)",
        "fb-blue-dark": "var(--fb-blue-dark)",
        "fb-blue-light": "var(--fb-blue-light)",
        "fb-dark": "var(--fb-dark)",
        "fb-darker": "var(--fb-darker)",
        "fb-gray": "var(--fb-gray)",
        "fb-card": "var(--fb-card)",
        "fb-border": "var(--fb-border)",
        "fb-text": "var(--fb-text)",
        "fb-text-secondary": "var(--fb-text-secondary)",
        "fb-hover": "var(--fb-hover)",
        "fb-input-bg": "var(--fb-input-bg)",
        "fb-green": "var(--fb-green)",
        "fb-gold": "var(--fb-gold)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        modal: "var(--shadow-modal)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-3px)" },
          "40%": { transform: "translateX(3px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        floatParticle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatParticleAlt: {
          "0%, 100%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(20px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
        gradientShift: "gradientShift 8s ease infinite",
        floatParticle: "floatParticle 5s ease-in-out infinite",
        floatParticleAlt: "floatParticleAlt 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
