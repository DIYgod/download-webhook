const { download } = require('./utils');

module.exports = (options, callback) => {
    let op = ``;
    let path = '';
    if (options.path) {
        path = `downloads/${options.path}/%(title)s.%(ext)s`;
    }
    else {
        path = `downloads/%(title)s.%(ext)s`;
    }
    op += ` -o '${path}'`;

    download(`yt-dlp ${op} '${options.url}' >> logs/youtube-dl.log`, callback);
}