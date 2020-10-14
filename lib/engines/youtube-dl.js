const { exec } = require('child_process');
const logger = require('../logger');
const config = require('../config');

module.exports = (options, callback) => {
    let op = '--recode-video mp4';
    let path = '';
    if (options.path) {
        path = `downloads/${options.path}/%(title)s-%(id)s.%(ext)s`;
    }
    else {
        path = `downloads/%(title)s-%(id)s.%(ext)s`;
    }
    op += ` -o '${path}'`;

    logger.info(`start download: ${JSON.stringify(options)}`);

    let retryTimes = config.retryTimes;
    const download = () => {
        exec(`youtube-dl ${op} '${options.url}' >> logs/youtube-dl.log`, (err, stdout, stderr) => {
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