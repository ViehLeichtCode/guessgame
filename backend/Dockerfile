# --- Build Stage ---
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Dependencies cachen
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Quellcode kopieren und bauen
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- Runtime Stage ---
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# JAR aus Build Stage kopieren
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]