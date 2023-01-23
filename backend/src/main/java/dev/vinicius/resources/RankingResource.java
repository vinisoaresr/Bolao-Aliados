package dev.vinicius.resources;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.eclipse.microprofile.jwt.JsonWebToken;

import dev.vinicius.model.entity.Ranking;
import dev.vinicius.model.entity.User;
import io.quarkus.panache.common.Sort;

@Path("/")
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RankingResource {

    @Inject
    JsonWebToken jwt;

    @GET
    @Path("/ranking/sort")
    @RolesAllowed({ "User", "Admin" })
    public Response sortRankingNow() {
        sortRanking();
        return Response.ok().status(200).build();
    }

    public void sortRanking() {
        List<User> users = User.listAll(Sort.by("score"));
        Collections.reverse(users);
        List<Ranking> rankings = Ranking.listAll();
        for (Ranking ranking : rankings) {
            ranking.deleted = new Date();
            ranking.delete();
        }
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            Ranking ranking = new Ranking(user, i);
            ranking.persist();
        }
    }

    @GET
    @Path("/ranking/list")
    @RolesAllowed({ "User", "Admin" })
    public Response getRanking(@Context SecurityContext ctx) {
        System.out.print(ctx.getUserPrincipal());
        System.out.print(jwt.getClaimNames());
        sortRanking(); // todo service brackground
        List<Ranking> rankings = Ranking.listAll(Sort.by("classification"));
        return Response.ok(rankings).status(200).build();
    }
}
