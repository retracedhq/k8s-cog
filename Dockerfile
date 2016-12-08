FROM node:7.1.0-alpine

ENV GOPATH=/home/bundle/go

RUN apk --no-cache add python bash build-base ca-certificates
RUN npm i -g yarn
RUN apk --no-cache add go gcc musl-dev git && \
    mkdir -p /home/bundle/go && \
    go get github.com/kubernetes/kubernetes/cmd/kubectl && \
    cp /home/bundle/go/bin/kubectl /usr/local/bin && \
    rm -rf /home/bundle/go && \
    apk del go gcc musl-dev git

WORKDIR /home/bundle/k8s-cog
COPY . /home/bundle/k8s-cog

RUN yarn
RUN make
