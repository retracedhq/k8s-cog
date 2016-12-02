build:
	mkdir -p lib
	./node_modules/.bin/tsc

test:
	yarn test

docker:
	docker build -t marc/kubernetes-cog .

deploy:
	docker push marc/kubernetes-cog