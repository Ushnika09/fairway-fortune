/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B3D2E",
        accent: "#D4AF37",
        dark: "#0F172A",
        card: "#111827",
        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",
        success: "#10B981",
      },
    },
  },
  plugins: [],
};