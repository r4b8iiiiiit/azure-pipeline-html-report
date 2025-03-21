const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: {
       tabContent:  "./src/tabContent.tsx",
    },

    resolve: {
        fallback: {
            buffer: require.resolve("buffer/"),
        },
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
        },
    },
    
    output: {
        filename: "[name].js", // Generates tabContent.js
        path: path.resolve(__dirname, "dist"), // Output directory
        publicPath: "dist/" // Ensures correct path for loading in the browser
    },

    stats: {
        warnings: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "azure-devops-ui/buildScripts/css-variables-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.woff$/,
                use: [{
                    loader: 'base64-inline-loader'
                }]
            },
            {
                test: /\.html$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: 
    [
        new CopyWebpackPlugin({
    patterns: [
        { from: "src/*.html", to: "[name][ext]" }, // Copies all .html files from src/ to dist/
    ],
}),
        new webpack.SourceMapDevToolPlugin({}),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'], // Polyfill Buffer globally
        }),
    ]
};