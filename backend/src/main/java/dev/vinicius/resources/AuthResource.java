package dev.vinicius.resources;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import dev.vinicius.model.entity.Auth;
import dev.vinicius.controller.AuthController;


@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    AuthController controller;

    @POST
    @Path("/auth")
    @PermitAll
    public Response auth(Auth data) {
        Auth auth = controller.login(data);
        return Response.ok(auth).status(200).build();
    }

    @POST
    @Path("/auth/refresh_token")
    @PermitAll
    public Response refreshToken(Auth data, @Context SecurityContext context) {
        Auth auth = controller.refreshToken(data, context);
        return Response.ok(auth).status(200).build();
    }
}
