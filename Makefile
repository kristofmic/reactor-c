.PHONY: run clean test build tag push

IMAGEORG ?= ccdfas
IMAGE ?= reactor-c
TAG = $(shell git ls-files -s . | shasum - | awk '{print $$1}')
PORT=8080

clean:
	echo "Running ${@}"
	-docker rm -vf $(shell docker ps -qa)

build:
	echo "Running ${@}"
	docker build -t ${IMAGE} .

tag:
	echo "Running ${@}"
	docker tag ${IMAGE} ${IMAGEORG}/${IMAGE}:${BRANCH_NAME}
	docker tag ${IMAGE} ${IMAGEORG}/${IMAGE}:$(TAG)

push: tag
	echo "Running ${@}"
	docker push ${IMAGEORG}/${IMAGE}:${BRANCH_NAME}
	docker push ${IMAGEORG}/${IMAGE}:$(TAG)

test:
	echo "Running ${@}"
	docker run --rm -v ${PWD}/test/coverage:/reactor/test/coverage -v ${PWD}/test/results:/reactor/test/results ${IMAGE} npm test

run:
	echo "Running ${@}"
	docker run -d -p ${PORT}:${PORT} -e PORT=${PORT} -e CONFIG=${DEPLOY_ENV} --name ${IMAGE} ${IMAGEORG}/${IMAGE}:${TAG}