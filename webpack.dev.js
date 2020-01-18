const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const manifest = require('./manifest.js');
const common = require('./webpack.common.js');

module.exports = {
    ...common,
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        ...common.output,
        path: path.resolve(__dirname, 'build', 'dev'),
    },
    plugins: [
        ...common.plugins,
        new GenerateJsonPlugin('manifest.json', {
            ...manifest,
            content_security_policy: `${manifest.content_security_policy}; script-src 'self' 'unsafe-eval'`,
        }, null, 2),
    ],
};
