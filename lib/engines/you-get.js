const { exec } = require('child_process');
const logger = require('../logger');
const config = require('../config');

module.exports = (options, callback) => {
    let op = '';
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

    logger.info(`start download: ${JSON.stringify(options)}`);

    let retryTimes = 3;
    const download = () => {
        exec(`you-get -k ${options.playlist !== '0' ? '--playlist' : ''} ${op} '${options.url}' >> logs/you-get.log`, (err, stdout, stderr) => {
            if (err) {
                logger.error(`error: ${JSON.stringify(options)}, ${stderr}`);
                if (retryTimes > 0) {
                    retryTimes--;
                    download();
                } else {
                    callback();
                }
            } else {
                logger.info(`success: ${JSON.stringify(options)}`);
                callback();
            }
        });
    }
    download();
}