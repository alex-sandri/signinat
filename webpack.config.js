const path = require("path");

module.exports = [
    {
        entry: {
            main: path.resolve(__dirname, "src/ts/main.ts"),
            signup: path.resolve(__dirname, "src/ts/signup.ts"),
            signin: path.resolve(__dirname, "src/ts/signin.ts"),
            account: path.resolve(__dirname, "src/ts/account.ts"),
            settings: path.resolve(__dirname, "src/ts/settings.ts"),
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
            main: path.resolve(__dirname, "src/scss/main.scss"),
            signup: path.resolve(__dirname, "src/scss/signup.scss"),
            account: path.resolve(__dirname, "src/scss/account.scss"),
            settings: path.resolve(__dirname, "src/scss/settings.scss"),
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