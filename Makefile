build:
	rm -rf lib
	mkdir -p lib
	./node_modules/.bin/tslint --project ./tsconfig.json
	./node_modules/.bin/tsc
