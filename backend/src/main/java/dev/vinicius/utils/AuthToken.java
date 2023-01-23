package dev.vinicius.utils;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;

import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import dev.vinicius.model.entity.User;
import io.smallrye.jwt.build.Jwt;

@ApplicationScoped
public class AuthToken {

    @ConfigProperty(name = "mp.jwt.verify.issuer")
    public String issuer;

    public String GenerateAccessToken(User user) {
        String accessToken = Jwt.issuer(this.issuer)
                .upn(user.mail)
                .groups(new HashSet<>(Arrays.asList("User", "Admin")))
                .expiresAt(Instant.now().plus(Duration.ofMinutes(10)))
                .sign();
        return accessToken;
    }

    public String GenerateRefreshToken(User user) {
        String refreshToken = Jwt.issuer(this.issuer)
                .upn(user.mail)
                .groups(new HashSet<>(Arrays.asList("User", "Admin")))
                .expiresAt(Instant.now().plus(Duration.ofDays(7)))
                .sign();
        return refreshToken;
    }
}