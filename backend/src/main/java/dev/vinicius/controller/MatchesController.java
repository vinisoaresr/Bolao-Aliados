package dev.vinicius.controller;

import dev.vinicius.model.entity.Match;
import dev.vinicius.model.integration.Integration;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class MatchesController {

    @Inject
    Logger log;

    @Transactional
    public void createMatches(Integration integration) {
        if (integration.isEmpty()) {
            return;
        }
        if (integration.matches.isEmpty()) {
            return;
        }

        Match newMatch;
//        integration.matches.forEach(match ->
//                newMatch = new Match(
//                        match.id,
//                        false,
//                        new Date(match.utcDate),
//                        match.homeTeam.id,
//                        match.awayTeam.id,
//                        match.score.fullTime.home,
//                        match.score.fullTime.away,
//                        match.group
//                        )
//        );

    }
}
