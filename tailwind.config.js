import tailwindScrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["monospace"],
      bold: ["monospace"],
      blinker: ["BlinkerBold"]
    },
    extend: {
      colors: {
        footerTextColor: "#9bc25b",
        navLinkColor: "#4fd1c5",
        footerBoxColor: "#C6DAF1",
        footerProfileNameColor: "#00000",
        footerBackgroundColor: "#f9f9f9",
        footerLinkedinHoverColor: "#0072B1"
      },
      fontSize: {
        "18px": "18px",
        "22px": "22px"
      }
    }
  },
  darkMode: "class",
  plugins: [tailwindScrollbarHide]
};
