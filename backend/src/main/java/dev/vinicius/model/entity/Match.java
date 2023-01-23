package dev.vinicius.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Match extends PanacheEntity {

    @Column
    public Integer id_match;

    @Enumerated(EnumType.STRING)
    public MatchStatus status;

    @Column(nullable = true)
    public Date date;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "home_team_id") // todo add nullable
    public Team homeTeam;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "away_team_id") // todo add nullable
    public Team awayTeam;

    @OneToOne(cascade = CascadeType.ALL)
    public Score score;

    @ManyToOne
    @JoinColumn // todo add nullable
    public Competition competition;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Group group;
}


