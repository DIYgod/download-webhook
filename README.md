# download-webhook

> Download files through webhook

## Introduction

download-webhook is a tiny webhook server to download media contents (videos, audios, images) from the Web to your VPS or NAS through Webhook(post request) handily, it supports download from all [you-get supported sites](https://github.com/soimort/you-get#supported-sites) and exact resource url.

What you-get can do for you:

- Auto download videos / audios / images through [RSSHub](https://github.com/DIYgod/RSSHub) + [IFTTT Webhook Service](https://help.ifttt.com/hc/en-us/articles/115010230347-The-Webhooks-Service) from YouTube / Twitter / Instagram / bilibili / any sites supported by [you-get](https://github.com/soimort/you-get#supported-sites) and [RSSHub](https://github.com/DIYgod/RSSHub)

## Installation

### Docker

```
docker run -d -p 3000:3000 -v downloads:/app/downloads -e SECRET=mysecret -e PORT=3000 diygod/download-webhook
```

### Manual

Prerequisites:

- [you-get](https://github.com/soimort/you-get)

```
yarn
yarn start
```

or 


```
npm install
npm run start
```

## Getting Started

### Try it yourself

```
curl -X POST -H "Content-Type:application/json" -d '{"secret": "mysecret", "path": "mypath", "name": "myvideo", "url": "https://www.bilibili.com/video/av45364988", "playlist": "1"}' http://127.0.0.1:3000
```

### Work with [IFTTT](https://ifttt.com) and [RSSHub](https://github.com/DIYgod/RSSHub)

For example:

Audo download my liked video on bilibili

![](https://i.loli.net/2019/05/31/5cf105491baa262840.jpg)