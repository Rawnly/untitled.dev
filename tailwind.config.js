const {
  createAlias,
  colors: radixColors,
  plugin: tailwindRadixColors,
} = require("tailwind-radix-colors");

const palette = {
  ...radixColors,
  ...createAlias("neutral", "slate"),
  ...createAlias("primary", "cyan"),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    colors: palette,
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
    tailwindRadixColors({
      colors: palette,
    }),
  ],
};
