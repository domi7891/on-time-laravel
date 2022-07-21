const mix = require("laravel-mix");
const config = require("./webpack.config");

mix.js("resources/js/app.jsx", "public/js").react();
mix.webpackConfig(config);
