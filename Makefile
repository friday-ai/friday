build:
	@docker-compose build --no-cache

prod:
	@docker-compose -f docker-compose.yml \
		-f docker-compose.prod.yml \
		up -d --remove-orphans

dev:
	@if [ -d ./node_modules ]; then rm -r ./node_modules; fi
	@if [ -d ./client/node_modules ]; then rm -r ./client/node_modules; fi
	@if [ -d ./server/node_modules ]; then rm -r ./server/node_modules; fi
	@docker compose up -d --remove-orphans

log:
	@docker container logs -n 20 Friday-ai
