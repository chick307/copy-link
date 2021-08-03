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
        /* eslint-disable @typescript-eslint/naming-convention */
        browser_action: {
            ...manifest.browser_action,
            default_title: `${manifest.browser_action.default_title} [DEV]`,
        },
        content_security_policy: `${manifest.content_security_policy}; script-src 'self' 'unsafe-eval'`,
        name: `${manifest.name} [DEV]`,
        /* eslint-enable @typescript-eslint/naming-convention */
    },
    mode: 'development',
    outputPath: 'dev',
});
