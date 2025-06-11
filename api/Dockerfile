# api/Dockerfile

# --- Stage 1: The Builder ---
# We use a specific Go version as our builder image.
FROM golang:1.24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application. CGO_ENABLED=0 is important for a static binary.
# -o /app/server creates the compiled binary at this path.
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server

# --- Stage 2: The Final Image ---
# We start from a minimal 'alpine' image for a small final image size.
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy ONLY the compiled binary from the 'builder' stage.
# This makes our final image very small and secure.
COPY --from=builder /app/server .

# Tell Docker that the container listens on port 8080
EXPOSE 8080

# The command to run when the container starts.
CMD ["/app/server"]
