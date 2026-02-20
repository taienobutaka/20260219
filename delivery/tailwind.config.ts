const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens,
    ripple: (theme: (arg0: string) => any) => ({
      colors: theme("colors"),
      modifierTransition: "background 0.2s",
      activeTransition: "background 0.1s",
    }),
  },
  plugins: [require("tailwindcss-ripple")()],
};

module.exports.screens = screens;
