const winston = require('winston');
const config = require('./config');
const Transport = require('winston-transport');
const got = require('got');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            silent: process.env.NODE_ENV === 'test',
        }),
    ],
});

class TelegramTransport extends Transport {
    constructor(opts) {
        super(opts);
    }
  
    async log(info, callback) {
        got({
            method: 'post',
            url: `https://api.telegram.org/bot${config.telegram_token}/sendMessage`,
            json: {
                chat_id: config.telegram_chat_id,
                text: info.message,
            },
        });
        callback();
    }
};

if (config.telegram_chat_id && config.telegram_token) {
    logger.add(
        new TelegramTransport({
            silent: process.env.NODE_ENV === 'test',
        })
    );
}

module.exports = logger;