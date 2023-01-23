package dev.vinicius.controller;

import dev.vinicius.model.DTO.AccountRecoveryDTO;
import dev.vinicius.model.entity.AccountRecovery;
import dev.vinicius.model.entity.User;
import dev.vinicius.utils.MailUtils;
import io.quarkus.elytron.security.common.BcryptUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;

import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

@ApplicationScoped
public class AccountRecoveryController {
    @Inject
    MailUtils mailController;

    @Transactional
    public boolean recoveryAccount(User pUser) {
        User user = User.find("mail", pUser.mail).firstResult();
        if (Objects.isNull(user)) {
            return false;
        }
        AccountRecovery controller = new AccountRecovery(user);
        controller.persist();
        mailController.sendRecoveryMail(user, controller.uuid);
        controller.sendMailAt = new Date();
        controller.persist();
        return true;
    }

    @Transactional
    public Response ModifyPassword(AccountRecoveryDTO data, String uuid) {
        AccountRecovery accountRecovery = AccountRecovery.find("uuid", uuid).firstResult();
        if (Objects.isNull(accountRecovery)) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        User user = User.findById(accountRecovery.requiredByUser.id);
        Calendar cal = Calendar.getInstance();
        cal.setTime(accountRecovery.generatedAt);
        cal.add(Calendar.HOUR_OF_DAY, 1);

        Date dataHoraServidor = new Date();

        if (dataHoraServidor.after(cal.getTime()) || accountRecovery.used || user.isEmpty()) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        user.password = BcryptUtil.bcryptHash(data.password);
        user.persist();
        accountRecovery.passwordResetedAt = new Date();
        accountRecovery.used = true;
        accountRecovery.persist();
        return Response.status(Response.Status.ACCEPTED).build();
    }
}
