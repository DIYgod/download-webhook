const { exec } = require('child_process');
const config = require('../config');

const download = (command, callback) => {
    let retryTimes = config.retryTimes;
    if (config.command_prefix) {
        command = `${config.command_prefix} && ` + command;
    }
    const dl = () => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                if (retryTimes > 0) {
                    retryTimes--;
                    dl();
                } else {
                    callback(1, stderr);
                }
            } else {
                callback();
            }
        });
    }
    dl();
}

module.exports = {
    download,
}