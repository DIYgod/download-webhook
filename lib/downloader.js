const youGet = require('./engines/you-get');
const wget = require('./engines/wget');
const bilili = require('./engines/bilili');
const youtubeDl = require('./engines/youtube-dl');
const list = [];
const logger = require('./logger');

const run = () => {
    logger.info(`Start download: ${JSON.stringify(list[0], null, 4)}`);

    const callback = (error, stderr) => {
        if (error) {
            logger.error(`Download error: ${JSON.stringify(list[0], null, 4)}, ${stderr}`);
        } else {
            logger.info(`Download success: ${JSON.stringify(list[0], null, 4)}`);
        }
        list.splice(0, 1);
        if (list.length) {
            run();
        }
    }
    switch (list[0].engine) {
        case 'you-get':
            youGet(list[0], callback);
            break;
        case 'wget':
            wget(list[0], callback);
            break;
        case 'bilili':
            bilili(list[0], callback);
            break;
        case 'youtube-dl':
            youtubeDl(list[0], callback);
            break;
    }
}

module.exports = (options, result) => {
    list.push(options);
    if (list.length === 1) {
        run();
    }
}
