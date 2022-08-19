# Friday

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:1444
npm run start:dev

# run tests with jest
npm run test

# run linter
npm i -g typescript tslint
npm run lint

# fix linting errors
npm run lint:fix

# Start container in development mode
## with make
make dev
## without make (please delete if exists all node_modules before)
docker compose up -d --remove-orphans

# Start container in production mode
## with make
make prod
## without make
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans
```
