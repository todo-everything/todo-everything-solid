/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  // darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    // styled: true,
    themes: ["forest"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    // prefix: "",
    // darkTheme: "dark",
  },
};