# syntax=docker/dockerfile:1

FROM golang:1.18.4-alpine

WORKDIR /app

COPY pkg ./pkg
COPY go.mod ./
COPY go.sum ./
COPY books.json ./
RUN go mod download

COPY *go ./

RUN go build -o /api
EXPOSE 420

CMD ["/api"]