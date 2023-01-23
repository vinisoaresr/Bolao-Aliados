package dev.vinicius.controller;

import dev.vinicius.model.entity.User;
import io.quarkus.elytron.security.common.BcryptUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.Date;
import java.util.Objects;

@ApplicationScoped
public class UserController {

    /*
     * Adds a new user in the database
     *
     * @param mail the mail
     * @param password the unencrypted password (it will be encrypted with bcrypt)
     * @param roles    the comma-separated roles
     */
    @Transactional
    public void create(String mail, String password, String name) {
        User user = User.find("mail", mail).firstResult();

        if (!Objects.isNull(user)) {
            throw new BadRequestException("Usuário já cadastrado");
        }

        user = new User();
        user.name = name;
        user.mail = mail;
        user.password = BcryptUtil.bcryptHash(password);
        // user.roles = Arrays.asList(TypeRoles.User);
        user.avatar = "/"; // TODO
        user.created = new Date();
        user.transactions = null;
        user.persist();
    }
}