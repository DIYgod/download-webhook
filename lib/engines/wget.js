const { exec } = require('child_process');
const config = require('../config');

module.exports = (options, callback) => {
    let op = '-a logs/wget.log';
    if (options.name) {
        if (options.path) {
            exec(`mkdir -p downloads/${options.path}`);
            op += ` -O downloads/${options.path}/${options.name}`;
        } else {
            op += ` -O downloads/${options.name}`;
        }
    } else if (options.path) {
        op += ` -P downloads/${options.path}/`;
    }

    let retryTimes = config.retryTimes;
    const download = () => {
        exec(`wget ${op} ${options.url}`, (err, stdout, stderr) => {
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
