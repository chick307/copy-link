/* eslint sort-keys: 'error' */

const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const manifest = require('./manifest.js');
const common = require('./webpack.common.js');

module.exports = {
    ...common,
    mode: 'production',
    output: {
        ...common.output,
        path: path.resolve(__dirname, 'build', 'prod'),
    },
    plugins: [
        ...common.plugins,
        new GenerateJsonPlugin('manifest.json', manifest, null, 2),
    ],
};
