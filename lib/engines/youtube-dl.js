const { download } = require('./utils');

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

    download(`youtube-dl ${op} '${options.url}' >> logs/youtube-dl.log`, callback);
}