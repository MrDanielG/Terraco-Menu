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
                    lighter: '#FD8D00',
                    light: '#FF6E3A',
                    DEFAULT: '#FA4A0C',
                    dark: '#E31B00',
                },
                mygreen: {
                    DEFAULT: '#3ABB2E',
                },
                backgroundImage: (theme) => ({
                    login: "url('https://images.unsplash.com/photo-1627844642677-8b30cb8fc636?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                }),
            },
        },
        fontFamily: {
            sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
