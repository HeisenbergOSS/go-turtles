FROM golang:1.21-alpine
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o turtles .
EXPOSE 8080
CMD ["./turtles"]
