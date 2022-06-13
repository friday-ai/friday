ARG NODE_ENV

FROM node:lts-alpine

# System dependencies
RUN apk add --no-cache sqlite

# Add friday core
RUN mkdir /src
WORKDIR /src
COPY . /src

RUN apk add --no-cache make gcc g++ python3 git \
    && npm install --unsafe-perm \
    && npm cache clean --force

ENV NODE_ENV $NODE_ENV

# Export listening port
EXPOSE 80

CMD ["npm" ,"run", "start:production"]
