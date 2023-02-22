/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Roboto", "Open Sans", "sans-serif"],
      body: ["Roboto", "Open Sans", "sans-serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "spin-medium": "spin 3s linear infinite",
      },
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#404040", //"#20232A",
        "secondary-dark-bg": "#2A2A2A", //'#33373E',
        "light-gray": "#737373", //'#F7F7F7',
        "light-gray-2": "#D4D4D4",
        "gray-cummins": "#4F4F4F",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
        "red-cummins": "#D02323",

        "green-light-cummins": "#909C24",
        "green-dark-cummins": "#006C5B",
        "blue-light-cummins": "#0085AD",
        "blue-dark-cummins": "#005587",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/img/cummins-inicio.jpg')",
        //"url:('https://dcc-webdcc-pro.s3.us-west-2.amazonaws.com/DCC03WebCummins/htdocs/content/uploads/20210324160643/porqueelegircummins-inicio.jpg')",
        //"url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
        "motor-login":
          "url('https://dcc-webdcc-pro.s3.us-west-2.amazonaws.com/DCC03WebCummins/htdocs/content/uploads/20210324160643/porqueelegircummins-inicio.jpg')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
