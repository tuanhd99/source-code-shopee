// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: "#ee4d2d"
      },
      minHeight: {
        "100vh-h-28": "calc(100% - 28rem)"
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      // Add your custom styles here
      addComponents({
        ".container": {
          maxWidth: theme("colmuns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4")
        }
      });
    })
    // require('@tailwindcss/line-clamp'),
  ]
};
