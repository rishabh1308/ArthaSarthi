/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCFA",
          100: "#FAF8F5",
          200: "#F5F1EB",
        },
        sky: {
          soft: "#E8F4FC",
          light: "#B8DFF5",
          DEFAULT: "#6BB8E8",
          deep: "#3A9AD9",
          muted: "#A8D4F0",
        },
        teal: {
          soft: "#E6F5F3",
          DEFAULT: "#5BBFB5",
          deep: "#3A9E94",
        },
        slate: {
          ink: "#1E293B",
          muted: "#64748B",
          light: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(59, 154, 217, 0.12)",
        card: "0 8px 32px -8px rgba(30, 41, 59, 0.08)",
        glow: "0 0 40px -10px rgba(107, 184, 232, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #FDFCFA 0%, #E8F4FC 50%, #F5F1EB 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(232,244,252,0.6) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
