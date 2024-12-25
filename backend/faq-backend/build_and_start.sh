#!/bin/bash

# Stop and remove any existing containers and networks
docker-compose down

# Build the images (if needed)
docker-compose build

# Start the containers in detached mode
docker-compose up -d

# Wait for the PostgreSQL container to be ready
echo "Waiting for PostgreSQL to initialize..."
# Loop until PostgreSQL is ready
until docker-compose exec db pg_isready -U postgres -d llm -t 30
do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 5  # Sleep for 5 seconds before trying again
done

# PostgreSQL is ready
echo "PostgreSQL is ready!"

# Optional: Display the logs of the db container
docker-compose logs -f db

echo "Containers are up and running!"
