const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const downloader = require('./downloader');
const config = require('./config');
const logger = require('./logger');
const { exec } = require('child_process');
exec(`mkdir downloads`);

const app = new Koa();
app.use(bodyParser());

app.use(ctx => {
    const options = Object.assign({
        'engine': 'you-get',
        'path': '',
        'url': '',
        'name': '',
        'playlist': '0',
        'tweet': '',
    }, ctx.request.body);

    const result = {
        code: 0,
        data: options,
    }

    if (config.secret && config.secret !== options.secret) {
        result.code = 1;
        result.msg = 'wrong secret';
    } else if (!options.url) {
        result.code = 2;
        result.msg = 'lacking url';
    } else if (['you-get', 'wget', 'bilili', 'youtube-dl'].indexOf(options.engine) === -1) {
        result.code = 3;
        result.msg = 'unsupported engine';
    } else {
        if (options.tweet && options.engine === 'wget') {
            const match = options.tweet.match(/src="(.*?)"/g);
            if (match) {
                match.forEach((src, index) => {
                    const newOptions = JSON.parse(JSON.stringify(options));
                    newOptions.url = src.replace(/src="(.*)"/, '$1');
                    const format = (newOptions.url.match(/\.mp4/) ? 'mp4' : newOptions.url.match(/format=(.*?)&/)?.[1]) || 'jpg';
                    newOptions.name = `${encodeURIComponent(options.url)}-${index}.${format}`;
                    downloader(newOptions, result);
                });
            }
        } else {
            downloader(options, result);
        }
    }
    
    ctx.body = JSON.stringify(result);
});

app.listen(config.port);