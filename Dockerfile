ARG NODE_ENV

FROM node:12-alpine

# System dependencies
RUN apk update
RUN apk add --no-cache sqlite gzip tzdata

RUN mkdir /src
WORKDIR /src
COPY . /src

RUN apk add --no-cache --virtual .build-deps make gcc g++ python git libffi-dev linux-headers udev \
    && npm install --unsafe-perm --silent \
    && npm cache clean --force \
    && apk del .build-deps

ENV NODE_ENV $NODE_ENV

CMD ["npm" ,"run", "start"]
