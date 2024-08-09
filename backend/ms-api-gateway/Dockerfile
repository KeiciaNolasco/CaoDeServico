FROM openjdk:21
VOLUME /tmp
EXPOSE 8765
ADD ./target/ms-api-gateway-0.0.1-SNAPSHOT.jar ms-api-gateway.jar
ENTRYPOINT ["java", "-jar", "/ms-api-gateway.jar"]