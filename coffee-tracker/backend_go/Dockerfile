FROM golang:1.25-alpine AS build
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/main .
ENTRYPOINT ["./main"]