# Use the official OpenJDK image as a base
FROM openjdk:21-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven or Gradle build output (jar file) to the container
COPY target/my-app.jar /app/my-app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "my-app.jar"]
