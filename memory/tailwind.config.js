/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        border: "#E5E5E5",
        "sidebar-bg": "#F5F5F5",
        primary: "#0A0A0A",
        secondary: "#737373",
        action: "#18181B",
        amber: "#F59E0B",
        "tag-bg": "#F4F4F5",
        "tag-text": "#A1A1AA",
        "priority-high": "#EF4444",
        "priority-strong": "#F59E0B",
        "priority-watch": "#EAB308",
        // CHANEL luxury palette
        "chanel-black": "#0A0A0A",
        "chanel-white": "#FFFFFF",
        "chanel-gray": "#737373",
        "chanel-light": "#F5F5F5",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        content: "860px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
        luxury: "0 8px 30px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
