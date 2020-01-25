prod:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.prod.yml \
	up -d --remove-orphans

dev:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
	up -d --remove-orphans
