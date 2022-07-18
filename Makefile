build:
	@docker-compose build --no-cache

prod:
	@docker-compose -f docker-compose.yml \
		-f docker-compose.prod.yml \
		up -d --remove-orphans

dev:
	@docker compose up -d --remove-orphans

log:
	@docker container logs -n 20 Friday-ai
