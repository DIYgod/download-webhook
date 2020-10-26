const { exec } = require('child_process');
const config = require('../config');
const { download } = require('./utils');

module.exports = (options, callback) => {
    let op = `-k ${options.playlist !== '0' ? '--playlist' : ''}`;
    if (options.name) {
        op += ` -O ${options.name}`;
    }
    if (options.path) {
        exec(`mkdir -p downloads/${options.path}`);
        op += ` -o downloads/${options.path}`;
    }
    else {
        op += ` -o downloads`;
    }
    if (options.url.indexOf("bilibili") !== -1 && config.bilibili_cookie_path) {
        op += ` -c ${config.bilibili_cookie_path}`;
    }

    download(`you-get ${op} '${options.url}' >> logs/you-get.log`, callback);
}