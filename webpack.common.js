/* eslint sort-keys: 'error' */

const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (options) => {
    return {
        context: __dirname,
        devtool: options.devtool,
        entry: {
            popup: './src/entries/popup.tsx',
        },
        mode: options.mode,
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
                                ...(options.cssLoaderOptions ?? {}),
                                modules: {
                                    exportLocalsConvention: 'camelCase',
                                    ...(options.cssLoaderOptions?.modules ?? {}),
                                },
                            },
                        },
                    ],
                },
            ],
        },
        output: {
            filename: path.join('scripts', '[name].js'),
            path: path.resolve(__dirname, 'build', options.outputPath),
        },
        plugins: [
            new CopyPlugin({ patterns: [{ from: 'src/assets', to: 'assets' }] }),
            new CopyPlugin({ patterns: [{ from: 'src/views', to: 'views' }] }),
            new MiniCssExtractPlugin({ filename: path.join('styles', '[name].css') }),
            new GenerateJsonPlugin('manifest.json', options.manifest, null, 2),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };
};
