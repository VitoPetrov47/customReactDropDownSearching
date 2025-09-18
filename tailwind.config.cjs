/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "gray-dark": "#333333",
                "gray-medium": "#666666",
                "gray-light": "#999999",
            },
        },
    },
    plugins: [],
};
