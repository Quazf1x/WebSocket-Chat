/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        Board: "5fr 1fr",
      },
      gridTemplateRows: {
        Board: "5fr 1fr",
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradbg: "gradBg 15s ease-in-out infinite alternate",
      },
      keyframes: {
        gradBg: {
          "0%": {
            backgroundPosition: "left",
          },
          "100%": {
            backgroundPosition: "right",
          },
        },
      },
    },
  },
  plugins: [],
};
