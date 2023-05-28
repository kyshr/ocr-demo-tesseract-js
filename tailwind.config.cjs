/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            backgroundImage: {
                cars: "url('/assets/images/cars-bg.png')",
            },
        },
    },
    plugins: [],
};
