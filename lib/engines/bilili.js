const { exec } = require('child_process');
const config = require('../config');
const { download } = require('./utils');

module.exports = (options, callback) => {
    let op = '-y --playlist-type=no';
    let path = '';
    if (options.path) {
        path = `downloads/${options.path}`;
        exec(`mkdir -p ${path}`);
    }
    else {
        path = `downloads`;
    }
    op += ` -d ${path}`;
    if (options.sessdata || config.sessdata) {
        op += ` -c ${options.sessdata || config.sessdata}`;
    }

    download(`bilili ${op} '${options.url}' >> logs/bilili.log`, callback);
}