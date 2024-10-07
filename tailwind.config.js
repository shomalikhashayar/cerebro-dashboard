/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['IRANSans', 'iransans'],
            body: ['IRANSans', 'iransans'],
        },
        extend: {
            fontSize: {
                14: '14px',
            },
            backgroundColor: {
                'main-bg': '#FFFFFF',
                'main-dark-bg': '#353535',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
            },
            colors: {
                c1:'#353535',
                c2:'#3c6e71',
                c3:'#ffffff',
                c4:'#d9d9d9',
                c5:'#284b63',

            },
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            width: {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
            },
            height: {
                80: '80px',
            },
            minHeight: {
                590: '590px',
            },
            backgroundImage: {},
        },
    },
    plugins: [],
};
