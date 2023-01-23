package dev.vinicius.model.entity;

import javax.enterprise.context.ApplicationScoped;
import java.util.Date;

@ApplicationScoped
public class Auth {
    public  String name;
    public String mail;
    public String password;
    public User user;
    public String accessToken;
    public Date expireDateAccessToken;
    public String refreshToken;
    public Date expireDateRefreshToken;
}
