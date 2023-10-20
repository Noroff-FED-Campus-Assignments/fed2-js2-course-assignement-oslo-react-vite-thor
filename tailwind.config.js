/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindtypography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-aqua": "#21b2a6",
      },
      textColor: {
        "custom-aqua": "#21b2a6",
      },
      minWidth: {
        50: "50%",
      },
    },
  },
  plugins: [tailwindtypography, daisyui],
  daisyui: {
    themes: [
      {
        codetheme: {
          primary: "#AFD5C7",

          secondary: "#263A33",

          accent: "#5BA98E",

          neutral: "#fdba74",

          "base-100": "#071812",

          info: "#79ddf6",

          success: "#69e8db",

          warning: "#ef4444",

          error: "#d97706",
        },
      },
    ],
  },
};
