/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./views/**/*.ejs', './public/**/*.{html,js}'],
    variants: {
        scrollbar: ['rounded', 'dark'],
    },
    theme: {
        extend: {
            maxWidth: {
                '1/4': '25%',
                '1/3': '33%',
                '1/2': '50%',
                '2/3': '66%',
                '3/4': '75%',
                '9/10': '90%',
            },
            maxHeight: {
                'xl-a4': 'calc(36rem * 11 / 8.5)',
            },
            height: {
                '80vw-a4': 'calc(80vw * 11 / 8.5)',
            },
            screens: {
                xs: { max: '468px' },
            },
            brightness: {
                60: '.6',
            },
            flex: {
                '3/5': '1 1 60%',
                0: '0 0 auto',
            },
            translate: {
                '1/5': '20%',
            },
            rotate: {
                50: '50deg',
                100: '100deg',
            },
        },
        colors: {
            background: '#D5DCF9',
            backgroundDark: '#344966',
            accent: '#47C6D7',
            accentDark: '#5AA7B0',
            primary: '#1a4982',
            primaryDark: '#5B91D7',
            header: '#9EB1EB',
            headerDark: '#0D1821',
            secondary: '#4b76ab',
            secondaryDark: '#7E95B4',
            textPrimary: '#01161E',
            textPrimaryDark: '#F6F9F6',
            textSecondary: '#233840',
            textSecondaryDark: '#DDE6DB',
            inherit: 'inherit',
        },
    },
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant('mobile', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.mobile .${e(`mobile${separator}${className}`)}`;
                });
            });
        }),
        plugin(function ({ addVariant, e }) {
            addVariant('notDark', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `body:not(.dark) .${e(
                        `notDark${separator}${className}`
                    )}`;
                });
            });
        }),
        plugin(function ({ addVariant, e }) {
            addVariant('dark-fab', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.dark-fab .${e(
                        `dark-fab${separator}${className}`
                    )}`;
                });
            });
        }),
        require('flowbite/plugin'),
        require('tailwind-scrollbar'),
    ],
    darkMode: 'class',
    important: true,
};

