module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ... otras extensiones que puedas tener
      animation: {
        "pulse-ki": "pulse-ki 3s infinite",
      },
      keyframes: {
        "pulse-ki": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)", // orange-500/40
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 35px rgba(251, 191, 36, 0.7)", // amber-400/70
          },
        },
      },
    },
  },
  plugins: [],
};