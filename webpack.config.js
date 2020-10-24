const path = require("path");

module.exports = [
    {
        entry: {
            main: path.resolve(__dirname, "src/ts/main.ts"),
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                },
            ],
        },
        resolve: {
            extensions: [ ".ts", ".js" ],
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "public/assets/js"),
        },
        devServer: {
            contentBase: "./public",
        },
    },
    {
        entry: {
            bundle: path.resolve(__dirname, "src/scss/main.scss"),
        },
        output: {
            filename: "[name].style.js",
            path: path.resolve(__dirname, "public/assets/css"),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].css",
                            },
                        },
                        {
                            loader: "extract-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
            ],
        },
    },
];