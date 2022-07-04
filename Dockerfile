ARG NODE_ENV

FROM node:lts-alpine as base

FROM base as build-client

WORKDIR /usr/src

COPY client/ ./client/

RUN cd client && yarn install && yarn build

FROM base as build-server

WORKDIR /usr/src

COPY server/ ./server/

RUN cd server && yarn install && yarn build

FROM base

# System dependencies
RUN apk add --no-cache sqlite make

# Add friday core
WORKDIR /src

COPY --from=build-client /usr/src/client/dist ./client/dist
COPY --from=build-server /usr/src/server/dist ./server/dist

COPY --from=build-client /usr/src/client/node_modules ./client/node_modules
COPY --from=build-server /usr/src/server/node_modules ./server/node_modules

COPY package.json .
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/

ENV NODE_ENV $NODE_ENV

# Export listening port
EXPOSE 1444

CMD ["npm" ,"run", "start:production"]
