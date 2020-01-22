const path = require('path');

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const manifest = require('./manifest.js');
const common = require('./webpack.common.js');

module.exports = {
    ...common,
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        ...common.module,
        rules: common.module.rules.map((rule) => {
            return {
                ...rule,
                use: rule.use.map((use) => {
                    if (use.loader === 'css-loader') {
                        return {
                            ...use,
                            options: {
                                ...use.options,
                                modules: {
                                    localIdentName: '[local]__[path][name]',
                                },
                            },
                        };
                    }
                    return use;
                }),
            };
        }),
    },
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
