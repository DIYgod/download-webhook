const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    retryTimes: process.env.RETRY_TIMES || 3,
    secret: process.env.SECRET,
    bilibili_cookie_path: process.env.BILIBILI_COOKIE_PATH,
    sessdata: process.env.BILIBILI_SESSDATA,
    telegram_token: process.env.TELEGRAM_TOEKN,
    telegram_chat_id: process.env.TELEGRAM_CHAT_ID,
    ftqq_sckey: process.env.FTQQ_SCKEY,
    command_prefix: process.env.COMMAND_PREFIX,
};