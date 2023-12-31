lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npm run start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend