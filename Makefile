.PHONY: run clean test build push

IMAGEREPO ?= chourihan
IMAGE ?= reactor-c
TAG = $(shell git ls-files -s . | shasum - | awk '{print $$1}')
PORT = 8080

clean:
	echo "Running ${@}"
	-docker rm -vf $(shell docker ps -qa)

build:
	echo "Running ${@}"
	docker build -t ${IMAGE} -t ${IMAGEREPO}/${IMAGE}:${TAG} .

push:
	echo "Running ${@}"
	docker push ${IMAGEREPO}/${IMAGE}:$(TAG)

test:
	echo "Running ${@}"
	docker run --rm -v ${PWD}/test/coverage:/reactor/test/coverage -v ${PWD}/test/results:/reactor/test/results ${IMAGEREPO}/${IMAGE}:${TAG} npm test

run:
	echo "Running ${@}"
	docker run -d -p ${PORT}:${PORT} -e PORT=${PORT} -e CONFIG=${CONFIG} -e NODE_ENV=${NODE_ENV} --name ${IMAGE} ${IMAGEREPO}/${IMAGE}:${TAG}