package dev.vinicius.model.integration.matches;

import dev.vinicius.model.integration.competition.Competition;
import java.util.List;

public class Match {

    public Area area;
    public Competition competition;
    public Season season;
    public Integer id;
    public String utcDate;
    public String status;
    public Integer matchday;
    public String stage;
    public String group;
    public String lastUpdated;
    public HomeTeam homeTeam;
    public AwayTeam awayTeam;
    public Score score;
    public Odds odds;
    public List<Object> referees = null;

    /**
     * No args constructor for use in serialization
     */
    public Match() {
    }

    /**
     * @param area
     * @param matchday
     * @param awayTeam
     * @param competition
     * @param utcDate
     * @param lastUpdated
     * @param score
     * @param stage
     * @param odds
     * @param season
     * @param homeTeam
     * @param id
     * @param referees
     * @param status
     * @param group
     */
    public Match(Area area, Competition competition, Season season, Integer id, String utcDate, String status, Integer matchday, String stage, String group, String lastUpdated, HomeTeam homeTeam, AwayTeam awayTeam, Score score, Odds odds, List<Object> referees) {
        super();
        this.area = area;
        this.competition = competition;
        this.season = season;
        this.id = id;
        this.utcDate = utcDate;
        this.status = status;
        this.matchday = matchday;
        this.stage = stage;
        this.group = group;
        this.lastUpdated = lastUpdated;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.score = score;
        this.odds = odds;
        this.referees = referees;
    }

}
