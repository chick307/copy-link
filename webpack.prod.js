/* eslint sort-keys: 'error' */

const manifest = require('./manifest.js');
const config = require('./webpack.common.js');

module.exports = config({
    manifest,
    mode: 'production',
    outputPath: 'prod',
});
