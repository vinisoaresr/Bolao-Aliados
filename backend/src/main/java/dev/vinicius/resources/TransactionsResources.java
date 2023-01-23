package dev.vinicius.resources;

import java.util.Arrays;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import dev.vinicius.controller.TransactionsController;
import dev.vinicius.model.DTO.GenericDTO;
import dev.vinicius.model.entity.Transactions;
import dev.vinicius.model.entity.User;

@Path("/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class TransactionsResources {

    @Inject
    TransactionsController controller;

    @POST
    @RolesAllowed({ "User", "Admin" })
    @Path("/create")
    public Response createTransaction(Transactions data, @Context SecurityContext context) {
        GenericDTO responseBody;
        try {
            String email = context.getUserPrincipal().getName();
            User user = User.find("mail", email).firstResult();

            Transactions transaction = controller.createTransaction(data, user);
            if (transaction != null && transaction.isPersistent()) {
                responseBody = new GenericDTO(true, transaction, null);
                return Response.ok(responseBody).status(Response.Status.CREATED).build();
            } else {
                responseBody = new GenericDTO(false, null, Arrays.asList("Não foi possível criar a transação!"));
                return Response.ok(responseBody).status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            responseBody = new GenericDTO(false, null, Arrays.asList("Não foi possível criar a transação!"));
            return Response.ok(responseBody).status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/update")
    @RolesAllowed({ "User", "Admin" })
    public Response updateTransaction(Transactions data, @Context SecurityContext context) {
        GenericDTO responseBody;
        try {
            String email = context.getUserPrincipal().getName();
            User user = User.find("mail", email).firstResult();

            Transactions transaction = controller.updateTransaction(data, user);
            if (transaction != null && transaction.isPersistent()) {
                responseBody = new GenericDTO(true, transaction, null);
                return Response.ok(responseBody).status(Response.Status.ACCEPTED).build();
            } else {
                responseBody = new GenericDTO(false, null, Arrays.asList("Não foi possível editar a transação!"));
                return Response.ok(responseBody).status(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            responseBody = new GenericDTO(false, null, Arrays.asList("Não foi possível editar a transação!"));
            return Response.ok(responseBody).status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Path("/read")
    @RolesAllowed({ "User", "Admin" })
    public Response getAllTransactionsByUser(User pUser) {
        User user = User.findById(pUser.id);
        return Response.ok(user.transactions).status(200).build();
    }

    @GET
    @Path("/read/{id}")
    @RolesAllowed({ "User", "Admin" })
    public Response getTransaction(@PathParam("id") Long id) {
        Transactions transaction = Transactions.findById(id);
        if (transaction != null) {
            return Response.ok(transaction).status(Status.ACCEPTED).build();
        } else {
            return Response.ok().status(Status.BAD_REQUEST).build();
        }
    }
}
