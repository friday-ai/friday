build:
	@docker-compose build --no-cache

prod:
	@docker-compose up -d --remove-orphans

dev:
	@docker-compose run -d \
		-e NODE_ENV=development \
		-p 9000:9000 \
		-p 3000:3000
	friday
