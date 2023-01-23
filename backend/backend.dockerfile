# Build Stage
FROM maven:3.8.6 as build
WORKDIR /app
# Resolve dependencies
COPY /backend/pom.xml /app
RUN mvn -B dependency:resolve dependency:resolve-plugins
# Compile and Build App
COPY /backend/src /app/src
RUN mvn package -DskipTests

# Final Stage
FROM registry.access.redhat.com/ubi8/openjdk-11:1.11
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en'

COPY --chown=185 --from=build app/target/quarkus-app/lib/ /deployments/lib/
COPY --chown=185 --from=build app/target/quarkus-app/*.jar /deployments/
COPY --chown=185 --from=build app/target/quarkus-app/app/ /deployments/app/
COPY --chown=185 --from=build app/target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 3000
USER root

ENV AB_JOLOKIA_OFF=""

ENV PORT="3000"
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Dquarkus.http.port=$PORT -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar" 