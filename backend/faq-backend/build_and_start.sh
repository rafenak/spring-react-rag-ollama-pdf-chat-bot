#!/bin/bash

# Stop and remove any existing containers and networks
docker-compose down

# Build the images (if needed)
docker-compose build

# Start the containers in detached mode
docker-compose up -d

# Wait for the PostgreSQL container to be ready (adjust the sleep time if needed)
echo "Waiting for PostgreSQL to initialize..."
sleep 10

# Check if PostgreSQL is ready and running
docker-compose exec db pg_isready -U testuser -d llm

# Display the logs of the db container (optional)
docker-compose logs -f db

echo "Containers are up and running!"
