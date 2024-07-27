/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#181f2b",
        secondaryColor: "#1c2230",
        textColor: "#bcc2c6",
        hColor: "#fafefe",
        buttonColor: "#69ded8",
        urli: "url('./public/images/bg-curvy-desktop.svg')",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400",
      },
    },
  },
  plugins: [],
};
