package dev.vinicius.controller;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.SecurityContext;

import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import org.apache.sshd.common.config.keys.loader.openssh.kdf.BCrypt;
import dev.vinicius.model.entity.Auth;
import dev.vinicius.model.entity.User;
import dev.vinicius.utils.AuthToken;

import java.util.Date;

@ApplicationScoped
public class AuthController {

    @Inject
    AuthToken token;

    @Inject
    JWTParser parser;

    public Auth login(Auth data) {
        User user = User.find("mail", data.mail).firstResult();

        if (user == null) {
            throw new BadRequestException("E-mail ou senha incorretas");
        }

        boolean authenticated = BCrypt.checkpw(data.password, user.password);

        if (!authenticated) {
            throw new BadRequestException("E-mail ou senha incorretas");
        }

        System.out.print("Iniciando login com usuário: " + user.mail + "\n"); // todo log
        String accessToken = token.GenerateAccessToken(user);
        String refreshToken = token.GenerateRefreshToken(user);

        Long ACTOKEN = 0L;
        Long RFTOKEN = 0L;

        try {
            ACTOKEN = parser.parse(accessToken).getClaim("exp");
            RFTOKEN = parser.parse(refreshToken).getClaim("exp");
        } catch (ParseException e) {
            throw new BadRequestException("Credenciais incorretas!");
        }

        Auth auth = new Auth();
        auth.user = user;
        auth.user.transactions = null;
        auth.accessToken = accessToken;
        auth.refreshToken = refreshToken;
        auth.expireDateAccessToken = new Date(ACTOKEN * 1000); // milisec -> sec -> Date
        auth.expireDateRefreshToken = new Date(RFTOKEN * 1000); // milisec -> sec -> Date
        return auth;
    }

    public Auth refreshToken(Auth data, SecurityContext context) {
        Boolean authenticated = false;
        User user = null;
        Date expireDate = null;
        try {
            String mail = parser.parse(data.refreshToken).getClaim("upn");
            long expireDateOldToken = parser.parse(data.refreshToken).getClaim("exp");

            user = User.find("mail", mail).firstResult();
            expireDate = new Date(expireDateOldToken * 1000); // milsec to sec

            if (expireDate.after(new Date()) && user != null) {
                authenticated = true;
            } else {
                throw new BadRequestException("Credenciais incorretas!");
            }
        } catch (ParseException error) {
            System.out.print(error.getMessage()); // todo logger
        }

        if (authenticated) {
            String accessToken = token.GenerateAccessToken(user);
            String refreshToken = token.GenerateRefreshToken(user);
            System.out.print("Refresh token solicitado pelo usuário: " + user.mail + "\n"); // todo logger
            Long ACTOKEN = 0L;
            Long RFTOKEN = 0L;
            try {
                ACTOKEN = parser.parse(accessToken).getClaim("exp");
                RFTOKEN = parser.parse(refreshToken).getClaim("exp");
            } catch (ParseException e) {
                throw new BadRequestException("Credenciais incorretas!");
            }
            Auth auth = new Auth();
            auth.user = user;
            auth.accessToken = accessToken;
            auth.expireDateAccessToken = new Date(ACTOKEN * 1000); // milisec -> sec -> Date
            auth.refreshToken = refreshToken;
            auth.expireDateRefreshToken = new Date(RFTOKEN * 1000); // milisec -> sec -> Date
            return auth;
        } else {
            throw new BadRequestException("Credenciais incorretas!");
        }
    }

}
