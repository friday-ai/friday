build:
	@docker-compose -f .docker/docker-compose.prod.yml \
		build --no-cache

prod:
	@docker-compose -f .docker/docker-compose.prod.yml \
		up -d --remove-orphans --build

dev:
	@docker compose -f -f .docker/docker-compose.dev.yml \
    	up -d --remove-orphans --build

log-front:
	@docker container logs -n 20 friday-front

log-back:
	@docker container logs -n 20 friday-server

log:
	@make log-front
	@make log-back
