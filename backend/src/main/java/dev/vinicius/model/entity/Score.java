package dev.vinicius.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.*;
import java.util.Date;

@Entity
public class Score extends PanacheEntity {

    @OneToOne
    @JsonIgnore
    public Match match;

    @Column(name = "goals_home_team")
    public Integer homeTeam = 0;

    @Column(name = "goals_away_team")
    public Integer awayTeam = 0;

    @Column(nullable = false)
    public Date updated = new Date();

    @Column
    public String winner;

    public Score() {
    }

    public Score(dev.vinicius.model.integration.matches.Score score, Match match) {
        this.homeTeam = score.fullTime.home;
        this.awayTeam = score.fullTime.away;
        this.match = match;
        this.updated = new Date();

    }
}
