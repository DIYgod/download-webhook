const { exec } = require('child_process');
const config = require('../config');

module.exports = (options, callback) => {
    let op = `--all-subs --no-check-certificate`;
    let path = '';
    if (options.path) {
        path = `downloads/${options.path}/%(title)s-%(id)s.%(ext)s`;
    }
    else {
        path = `downloads/%(title)s-%(id)s.%(ext)s`;
    }
    op += ` -o '${path}'`;

    let retryTimes = config.retryTimes;
    const download = () => {
        exec(`youtube-dl ${op} '${options.url}' >> logs/youtube-dl.log`, (err, stdout, stderr) => {
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