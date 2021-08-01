module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                brown: {
                    light: '#844205',
                    DEFAULT: '#401D0A',
                },
                orange: {
                    light: '#FD8D00',
                    DEFAULT: '#FA4A0C',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
