const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        fontFamily: {
            sans: [
                "Nunito Sans",
                "sans-serif",
                ...defaultTheme.fontFamily.sans,
            ],
        },
        extend: {
            screens: { xs: "450px", xxs: "350px" },
            maxWidth: {
                max: "1700px",
                canvas: "200px",
            },
            maxHeight: {
                canvas: "450px",
            },
            colors: {
                accent: {
                    400: "#e6b000",
                    800: "#b38900",
                },
            },
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
    ],
};
