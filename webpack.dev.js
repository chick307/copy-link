/* eslint sort-keys: 'error' */

const manifest = require('./manifest.js');
const config = require('./webpack.common.js');

module.exports = config({
    cssLoaderOptions: {
        modules: {
            localIdentName: '[local]__[path][name]',
        },
    },
    devtool: 'inline-source-map',
    manifest: {
        ...manifest,
        /* eslint-disable @typescript-eslint/camelcase */
        browser_action: {
            ...manifest.browser_action,
            default_title: `${manifest.browser_action.default_title} [DEV]`,
        },
        name: `${manifest.name} [DEV]`,
        content_security_policy: `${manifest.content_security_policy}; script-src 'self' 'unsafe-eval'`,
        /* eslint-enable @typescript-eslint/camelcase */
    },
    mode: 'development',
    outputPath: 'dev',
});
