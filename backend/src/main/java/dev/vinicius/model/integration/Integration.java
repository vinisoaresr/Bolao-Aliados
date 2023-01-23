package dev.vinicius.model.integration;

import dev.vinicius.model.integration.competition.Competition;
import dev.vinicius.model.integration.filters.Filters;
import dev.vinicius.model.integration.matches.Match;
import dev.vinicius.model.integration.resultset.ResultSet;

import java.util.List;

public class Integration {

    public Filters filters;
    public ResultSet resultSet;
    public Competition competition;
    public List<Match> matches = null;

    /**
     * No args constructor for use in serialization
     */
    public Integration() {
    }

    /**
     * @param competition
     * @param filters
     * @param matches
     * @param resultSet
     */
    public Integration(Filters filters, ResultSet resultSet, Competition competition, List<Match> matches) {
        super();
        this.filters = filters;
        this.resultSet = resultSet;
        this.competition = competition;
        this.matches = matches;
    }

    public boolean isEmpty() {
        return this.matches == null || this.matches.isEmpty();
    }

}
