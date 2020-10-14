const { exec } = require('child_process');
const config = require('../config');

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

    let retryTimes = config.retryTimes;
    const download = () => {
        exec(`bilili ${op} '${options.url}' >> logs/bilili.log`, (err, stdout, stderr) => {
            if (err) {
                if (retryTimes > 0) {
                    retryTimes--;
                    download();
                } else {
                    callback(1, stderr);
                }
            } else {
                callback();
            }
        });
    }
    download();
}