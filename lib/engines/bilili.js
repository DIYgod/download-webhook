const { exec } = require('child_process');
const logger = require('../logger');
const config = require('../config');

module.exports = (options, callback) => {
    let op = '-y --playlist-type=no';
    if (options.name) {
        op += ` -O ${options.name}`;
    }
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

    logger.info(`start download: ${JSON.stringify(options)}`);

    let retryTimes = 3;
    const download = () => {
        exec(`bilili ${op} '${options.url}' >> logs/bilili.log`, (err, stdout, stderr) => {
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