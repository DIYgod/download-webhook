const winston = require('winston');
const config = require('./config');
const Transport = require('winston-transport');
const got = require('got');

class HTTPTransport extends Transport {
    constructor(opts) {
        super(opts);
    }
  
    async log (info, callback) {
        if (config.telegram_chat_id && config.telegram_token) {
            got({
                method: 'post',
                url: `https://api.telegram.org/bot${config.telegram_token}/sendMessage`,
                json: {
                    chat_id: config.telegram_chat_id,
                    text: info.message,
                },
            });
        }
        if (config.ftqq_sckey) {
            got({
                method: 'post',
                url: `https://sc.ftqq.com/${config.ftqq_sckey}.send`,
                form: {
                    text: info.message.split(': ')[0],
                    desp: info.message,
                },
            });
        }
        callback();
    }
};

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
        new HTTPTransport({
            silent: process.env.NODE_ENV === 'test',
        }),
    ],
});

module.exports = logger;