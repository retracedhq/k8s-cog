FROM node:7.1.0-alpine

ENV GOPATH=/home/bundle/go

RUN apk --no-cache add python bash build-base ca-certificates
RUN npm i -g yarn

WORKDIR /home/bundle/k8s-cog
COPY . /home/bundle/k8s-cog

RUN yarn
RUN make
RUN chmod +x lib/cmd/*.js
