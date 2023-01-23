package dev.vinicius.resources;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dev.vinicius.controller.UserController;
import dev.vinicius.model.entity.Auth;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import dev.vinicius.model.entity.User;
import org.jboss.logging.Logger;

@Path("/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResources {

    @Inject
    UserController controller;

    @Inject
    Logger log;

    @POST
    @Path("/create")
    @PermitAll
    public Response create(Auth signIn) {
        try {
            controller.create(signIn.mail, signIn.password, signIn.name);
            return Response.ok().status(200).build();
        } catch (Exception e) {
            log.info(e.getMessage());
            return Response.ok().status(500).build();
        }
    }

    @GET
    @Path("{id}")
    @RolesAllowed({ "User", "Admin" })
    public Response getUserById(@PathParam Long id) {
        try {
            User user = User.findById(id);
            return Response.ok(user).status(200).build();
        } catch (Exception e) {
            log.info(e.getMessage());
            return Response.ok().status(500).build();
        }
    }

    @POST
    @Path("/update")
    @RolesAllowed({ "User", "Admin" })
    public Response updateNewUser() {
        try {
            return Response.ok("Sucesso").status(200).build();
        } catch (Exception e) {
            log.info(e.getMessage());
            return Response.ok().status(500).build();
        }
    }
}