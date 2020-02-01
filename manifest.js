const pkg = require('./package.json');

module.exports = {
    /* eslint-disable @typescript-eslint/camelcase */
    manifest_version: 2,
    name: 'Copy Link',
    version: pkg.version,
    description: pkg.description,
    browser_action: {
        default_popup: 'views/popup.html',
        default_title: 'Copy Link',
    },
    content_security_policy: `default-src 'self'`,
    icons: {
    },
    minimum_chrome_version: '79',
    permissions: [
        'activeTab',
        'clipboardWrite',
    ],
    /* eslint-enable @typescript-eslint/camelcase */
};
