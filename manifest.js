const pkg = require('./package.json');

module.exports = {
    /* eslint-disable @typescript-eslint/camelcase */
    manifest_version: 2,
    name: 'Copy Link',
    version: pkg.version,
    description: pkg.description,
    browser_action: {
        default_icon: {
            32: 'assets/images/browser-action-32.png',
            64: 'assets/images/browser-action-64.png',
        },
        default_popup: 'views/popup.html',
        default_title: 'Copy Link',
    },
    content_security_policy: `default-src 'self'`,
    icons: {
        128: 'assets/images/icon-128.png',
    },
    minimum_chrome_version: '79',
    permissions: [
        'activeTab',
        'clipboardWrite',
    ],
    /* eslint-enable @typescript-eslint/camelcase */
};
