package dev.vinicius.resources;

import dev.vinicius.model.entity.Auth;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static io.restassured.RestAssured.given;


@QuarkusTest
class AuthResourceTest {

    @Test
    @DisplayName("Test auth method")
    void auth() {
        Auth auth = new Auth();
        auth.mail = "vinisoaresr@hotmail.com";
        auth.password = "12345";
        given()
            .contentType(ContentType.JSON)
            .body(auth)
        .when().post("/auth")
            .then()
                .statusCode(200);
    }
}