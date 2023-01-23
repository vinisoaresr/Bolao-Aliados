package dev.vinicius.resources;


import java.util.Comparator;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dev.vinicius.model.entity.Match;
import dev.vinicius.model.entity.MatchStatus;
import dev.vinicius.utils.HttpService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import dev.vinicius.model.entity.Group;

@Path("/match")
@Transactional
@Produces(MediaType.APPLICATION_JSON)
public class MatchResources {

    @Inject
    HttpService httpService;

    @GET
    @RolesAllowed({ "User", "Admin" })
    @Path("/{id}")
    public Response findMatchById(@PathParam Long id) {
        Match match = Match.findById(id);
        return Response.ok(match).status(200).build();
    }

    @GET
    @RolesAllowed({ "User", "Admin" })
    public Response findAllMatchs() {
        List<Match> matches = Match.listAll();
        matches.sort(Comparator.comparing(match -> match.date));
        matches.removeIf(match -> match.status == MatchStatus.FINISHED );
        return Response.ok(matches).status(200).build();
    }

    @GET
    @RolesAllowed({ "User", "Admin" })
    @Path("/byGroups")
    public Response findMatchsByGroups() {
        List<Group> groups = Group.listAll();
        for (Group group : groups) {
            group.teams = null;
        }
        return Response.ok(groups).status(200).build();
    }
}
