build:
	@docker-compose -f docker-compose.yml \
		-f docker-compose.prod.yml \
		build --no-cache

prod:
	@docker-compose -f .docker/docker-compose.prod.yml up -d --remove-orphans

dev:
	@docker compose -f docker-compose.yml \
    	-f docker-compose.dev.yml \
    	up -d --remove-orphans --build

log-front:
	@docker container logs -n 20 Friday-ai-front

log-back:
	@docker container logs -n 20 Friday-ai-back

log:
	@make log-front
	@make log-back
