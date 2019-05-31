FROM nikolaik/python-nodejs
LABEL MAINTAINER https://github.com/DIYgod/download-webhook

WORKDIR /app

COPY . /app

RUN apt-get update \
 && apt-get install -y ffmpeg \
 && pip3 install --no-cache-dir you-get \
 && apt-get install -y wget --no-install-recommends \
 && yarn;

EXPOSE 3000
CMD ["npm", "run", "start"]
