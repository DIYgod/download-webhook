const youGet = require('./engines/you-get');
const wget = require('./engines/wget');
const list = [];

const run = () => {
    const callback = () => {
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
    }
}

module.exports = (options, result) => {
    list.push(options);
    if (list.length === 1) {
        run();
    }
}
