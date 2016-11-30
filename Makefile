.PHONY: run clean test build tag push

IMAGEREPO ?= 118541355989.dkr.ecr.us-east-1.amazonaws.com
IMAGE ?= reactor-c
TAG = $(shell git ls-files -s . | shasum - | awk '{print $$1}')

clean:
	echo "Running ${@}"
	-docker rm -vf $(shell docker ps -qa)

build:
	echo "Running ${@}"
	docker build -t ${IMAGE} .

tag:
	echo "Running ${@}"
	docker tag ${IMAGE} ${IMAGEREPO}/${IMAGE}:$(TAG)

push: tag
	echo "Running ${@}"
	docker push ${IMAGEREPO}/${IMAGE}:$(TAG)

test:
	echo "Running ${@}"
	docker run --rm -v ${PWD}/test/coverage:/reactor/test/coverage -v ${PWD}/test/results:/reactor/test/results ${IMAGE} npm test

run:
	echo "Running ${@}"
	docker run -d -p ${PORT}:${PORT} -e PORT=${PORT} -e CONFIG=${CONFIG} -e NODE_ENV=${NODE_ENV} --name ${IMAGE} ${IMAGEREPO}/${IMAGE}:${TAG}