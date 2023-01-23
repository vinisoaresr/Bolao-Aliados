package dev.vinicius.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

import org.jboss.logging.Logger;

import dev.vinicius.model.entity.Competition;
import dev.vinicius.model.entity.Group;
import dev.vinicius.model.entity.Match;
import dev.vinicius.model.entity.MatchStatus;
import dev.vinicius.model.entity.Score;
import dev.vinicius.model.entity.Team;
import dev.vinicius.model.integration.Integration;

@ApplicationScoped
public class CompetitionController {

    @Inject
    Logger log;

    @Transactional
    public void refreshData(Integration integration) {
        if (integration.isEmpty()) {
            return;
        }

        Competition competition = Competition.find("id_competition", integration.competition.id).firstResult();
        if (competition == null) {
            competition = new Competition();
            competition.id_competition = integration.competition.id;
            competition.emblem = integration.competition.emblem;
            competition.name = integration.competition.name;
            competition.matches = createMatches(integration.matches);
            competition.persist();
        } else {
            refreshMatches(integration);
        }
    }

    @Transactional
    public List<Match> createMatches(List<dev.vinicius.model.integration.matches.Match> matches) {
        var format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        if (matches == null || matches.isEmpty()) {
            return null;
        }
        List<Match> returnMatches = new ArrayList<>();

        matches.forEach(match -> {
            Match newMatch = new Match();
            Group group = getOrCreateGroup(match);

            newMatch.id_match = match.id;
            newMatch.homeTeam = getOrCreateHomeTeam(match, newMatch, group);
            newMatch.awayTeam = getOrCreateAwayTeam(match, newMatch, group);
            try {
                newMatch.date = format.parse(match.utcDate);
            } catch (ParseException e) {
                newMatch.date = new Date();
                log.info("erro parse date integration: " + e.getMessage());
            }
            newMatch.status = MatchStatus.valueOf(match.status);
            newMatch.score = new Score(match.score, newMatch);
            newMatch.score.persist();
            newMatch.persist();
            returnMatches.add(newMatch);
        });
        return returnMatches;
    }

    private Team getOrCreateHomeTeam(dev.vinicius.model.integration.matches.Match match, Match newMatch,
            Group group) {
        Team team = null;
        team = Team.find("id_team", match.homeTeam.id).firstResult();
        if (team == null) {
            team = new Team(match.homeTeam);
        } else if (team.id == null || team.name == null) {
            team = new Team(match.homeTeam);
        }
        // team.group = group;
        return team;
    }

    private Team getOrCreateAwayTeam(dev.vinicius.model.integration.matches.Match match, Match newMatch,
            Group group) {
        Team team = null;
        team = Team.find("id_team", match.awayTeam.id).firstResult();
        if (team == null) {
            team = new Team(match.awayTeam);
        } else if (team.id == null || team.name == null) {
            team = new Team(match.homeTeam);
        }
        // team.group = group;
        return team;
    }

    private Group getOrCreateGroup(dev.vinicius.model.integration.matches.Match match) {
        // check if group exists in database and create if not exists in database.
        if (match.stage == "GROUP_STAGE") {
            Group group = Group.find("name", match.group).firstResult();
            if (group == null) {
                group = new Group();
                group.name = match.group;
                group.persist();
            }
            return group;
        } else {
            return null;
        }
    }

    @Transactional
    public void refreshMatches(Integration integration) {
        if (integration.isEmpty()) {
            return;
        }
        var format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        try {
            integration.matches.forEach((pMatch) -> {
                Match match = Match.find("id_match", pMatch.id).firstResult();
                if (Objects.isNull(match)) {
                    log.info("Nao foi possivel localizar a partida" + pMatch.id.toString());
                    return;
                }

                if (match.homeTeam.id_team != null && match.awayTeam.id_team != null) {
                    if (match.homeTeam.id_team.equals(pMatch.homeTeam.id)
                            && match.awayTeam.id_team.equals(pMatch.awayTeam.id)) {
                        match.status = MatchStatus.valueOf(pMatch.status);
                        Score score = Score.findById(match.score.id);
                        if (match.status == MatchStatus.FINISHED && pMatch.score.duration.equals("PENALTY_SHOOTOUT")){
                            score.homeTeam = 0;
                            score.awayTeam = 0;

                            score.homeTeam += pMatch.score.regularTime.home;
                            score.homeTeam += pMatch.score.extraTime.home;
                            
                            score.awayTeam += pMatch.score.regularTime.away;
                            score.awayTeam += pMatch.score.extraTime.away;
                        } else {
                            score.homeTeam = pMatch.score.fullTime.home;
                            score.awayTeam = pMatch.score.fullTime.away;
                        }
                        try {
                            match.date = format.parse(pMatch.utcDate);
                        } catch (ParseException e) {
                            score.persist();
                            match.persist();
                            log.info("(refresh data) - error parse date integration: " + e.getMessage());
                        }
                        score.persist();
                        match.persist();
                    }
                } else {
                    if (checkMatchInput(pMatch)) {
                        match.homeTeam = getOrCreateHomeTeam(pMatch, match, null);
                        match.awayTeam = getOrCreateAwayTeam(pMatch, match, null);
                    }
                    match.persist();
                }
            });
        } catch (Exception error) {
            log.info(error.getMessage());
            log.info(error.getStackTrace());
        }
    }

    private boolean checkMatchInput(dev.vinicius.model.integration.matches.Match pMatch) {
        boolean isValid = false;
        if (pMatch.homeTeam.id != null && pMatch.awayTeam.id != null && pMatch.homeTeam.name != null
                && pMatch.awayTeam.name != null) {
            isValid = true;
        }
        return isValid;
    }
}
