/* eslint sort-keys: 'error' */

const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    entry: {
        popup: './src/entries/popup.tsx',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            localsConvention: 'camelCase',
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: path.join('scripts', '[name].js'),
    },
    plugins: [
        new CopyPlugin([{ from: 'src/assets', to: 'assets' }]),
        new CopyPlugin([{ from: 'src/views', to: 'views' }]),
        new MiniCssExtractPlugin({ filename: path.join('styles', '[name].css') }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
