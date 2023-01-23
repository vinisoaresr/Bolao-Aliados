package dev.vinicius.resources;

import dev.vinicius.controller.AccountRecoveryController;
import dev.vinicius.model.entity.User;
import dev.vinicius.model.DTO.AccountRecoveryDTO;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/account_recovery")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AccountRecoveryResource {

    @Inject
    AccountRecoveryController controller;

    @POST
    @PermitAll
    public Response RequestAccountRecovery(User pUser) {
        try {
            if (controller.recoveryAccount(pUser)) {
                return Response.ok().status(Response.Status.ACCEPTED).build();
            } else {
                return Response.ok("Endereço de e-mail não encontrado ou não cadastrado.")
                        .status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            return Response.ok("Erro desconhecido.").status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/{uuid}")
    @PermitAll
    @Transactional
    public Response AccountRecovery(AccountRecoveryDTO data, @PathParam String uuid) {
        try {
            return controller.ModifyPassword(data, uuid);
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

}
