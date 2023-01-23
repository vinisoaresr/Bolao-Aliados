package dev.vinicius.utils;

import dev.vinicius.model.entity.User;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;
import org.jboss.logging.Logger;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.text.MessageFormat;

@ApplicationScoped
public class MailUtils {
        @ConfigProperty(name = "FRONTEND_URL", defaultValue = "localhost:3000")
        String BASE_URL;
        @Inject
        Mailer mailer;

        @Inject
        Logger log;

        String bodyMail = "<!DOCTYPE html>\n" +
                        "<html lang=\"pt-br\">\n" +
                        "\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        "    <meta http-equiv=\"Content-Type\" content=\"text/html charset=UTF-8\" />\n" +
                        "    <title>Account recovery</title>\n" +
                        "</head>\n" +
                        "\n" +
                        "<body style=\"margin: none; text-align:center;\">\n" +
                        "    <div\n" +
                        "        style=\"width: 50vw; display:flex; flex-direction: column; align-items: center; padding: 10px; margin: 10px; background-color: #fafafa; font-family:Arial, Helvetica, sans-serif;\">\n"
                        +
                        "        <h1>Olá, {0}!</h1>\n" +
                        "        <p>Você solicitou um link para a <b style=\"color: rgb(47, 53, 231)\"><a style=\"text-decoration: none;\"\n"
                        +
                        "                    href=\"{1}\">recuperação de senha</a></b> de sua\n" +
                        "            conta. Para redefini-lá, acesse o\n" +
                        "            link abaixo:</p>\n" +
                        "        <a href=\"{1}\"\n" +
                        "            style=\"line-height: 50px; background-color: #fe2b2b; text-decoration: none;border: none; border-radius: 8px;color: #ffffff; width: 20vw; height: 50px;\">Redefinir\n"
                        +
                        "            senha</a>\n" +
                        "        <p style=\"font-size: 12px; color: gray;\"> E-mail enviado automaticamente, por favor não responda.</p>\n"
                        +
                        "        <p style=\" font-size: 12px; color: gray;\">\n" +
                        "            se não foi você quem solicitou, apenas desconsidere essa mensagem.\n" +
                        "        </p>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "\n" +
                        "</html>";

        @Blocking
        public void sendRecoveryMail(User user, String uuid) {
                log.info("-> Sending recovery mail to " + user.mail);
                String url_recovery = BASE_URL + "/account-recovery/" + uuid;

                mailer.send(
                                Mail.withHtml(user.mail,
                                                "Recuperação de senha!",
                                                MessageFormat.format(bodyMail, user.name, url_recovery)));
        }
}