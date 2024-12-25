# Use the official OpenJDK image as a base
FROM openjdk:21-jdk-slim AS build

# Set the working directory
WORKDIR /app

# Copy the Maven or Gradle build output (jar file) to the container
COPY target/faq-backend-0.0.1-SNAPSHOT.jar /app/faq-backend-0.0.1-SNAPSHOT.jar

# Expose the application port
EXPOSE 8888

# Run the Spring Boot application
CMD ["java", "-jar", "faq-backend-0.0.1-SNAPSHOT.jar"]
