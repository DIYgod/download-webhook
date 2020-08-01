const dotenv = require("dotenv")
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    secret: process.env.SECRET,
    bilibili_cookie_path: process.env.BILIBILI_COOKIE_PATH,
};