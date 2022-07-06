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
## without make
docker-compose run -d \
		-p 9000:9000 \
		-p 3000:3000 \
		-e NODE_ENV=development \
		-v `pwd`:/usr/app \
		friday

# Start container in production mode
## with make
make prod
## without make
docker-compose up -d
```
