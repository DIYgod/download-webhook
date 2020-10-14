const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    retryTimes: process.env.RETRY_TIMES || 3,
    secret: process.env.SECRET,
    bilibili_cookie_path: process.env.BILIBILI_COOKIE_PATH,
    sessdata: process.env.BILIBILI_SESSDATA,
};