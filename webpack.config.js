const { generatePrimeSync } = require("crypto");
const { type } = require("os");
const path = require("path");
const PugPlugin = require('pug-plugin');
const loader = require("sass-loader");
const { Generator } = require("webpack");

const mode = process.env.NODE_ENV || "development" ;

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
    mode,
    target,
    devtool,
    entry: {
        index: path.resolve(__dirname, 'index.pug')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new PugPlugin({
          pretty: devMode,
          js: {
            // JS output filename, used if `inline` option is false (defaults)
            filename: '[name].[contenthash].js',
            //inline: true, // inlines JS into HTML
          },
          css: {
            // CSS output filename, used if `inline` option is false (defaults)
            filename: '[name].[contenthash].css',
            //inline: true, // inlines CSS into HTML
          },
        })
      ],
      module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'sass-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|ico)$/,
                type: 'asser/resource',
                generator: {
                    filename: 'media/[name].[hash][ext]'
                },
            },
            {
                test: /\.svg$/i,
                type: 'asser/resource',
                generator: {
                    filename: 'media/[name][ext][query]'
                },
            },
        ],
    },
}