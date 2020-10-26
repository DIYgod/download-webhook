const { exec } = require('child_process');
const { download } = require('./utils');

module.exports = (options, callback) => {
    let op = '-a logs/wget.log';
    if (options.name) {
        if (options.path) {
            exec(`mkdir -p downloads/${options.path}`);
            op += ` -O downloads/${options.path}/${options.name}`;
        } else {
            op += ` -O downloads/${options.name}`;
        }
    } else if (options.path) {
        op += ` -P downloads/${options.path}/`;
    }

    download(`wget ${op} ${options.url} >> logs/wget.log`, callback);
}
