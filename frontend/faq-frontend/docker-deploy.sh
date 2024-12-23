#!/bin/bash

# Docker image and container names
IMAGE_NAME="here-faq"
CONTAINER_NAME="here-faq-container"
HOST_PORT=8080
CONTAINER_PORT=8080

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -t "$IMAGE_NAME" .

# Step 2: Stop and remove the existing container (if it exists)
echo "Stopping existing container (if running)..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

# Step 3: Run the Docker container
echo "Running Docker container..."
docker run -d -p "$HOST_PORT:$CONTAINER_PORT" --name "$CONTAINER_NAME" "$IMAGE_NAME"

echo "Docker container started successfully. App is running on http://localhost:$HOST_PORT"
