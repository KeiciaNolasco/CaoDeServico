FROM openjdk:21
VOLUME /tmp
ADD ./target/ms-oauth-0.0.1-SNAPSHOT.jar ms-oauth.jar
ENTRYPOINT ["java", "-jar", "/ms-oauth.jar"]
