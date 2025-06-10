/** @type {import('tailwindcss').Config} */
module.exports = {
    // Atualize o glob se seus arquivos estiverem em outra pasta
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#a684ff',
                secundary: '#e7e5e4',
            },
        },
    },
    plugins: [],
}