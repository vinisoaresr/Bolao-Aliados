package dev.vinicius.model.entity;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.vinicius.model.integration.matches.AwayTeam;
import dev.vinicius.model.integration.matches.HomeTeam;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import java.util.Date;
import java.util.List;

@Entity
public class Team extends PanacheEntity {

    @Column
    public Integer id_team;

    @Column
    public String name;

    @Column
    public String crest_path;

    @ManyToOne
    Group group;

    @Column
    public Boolean active;

    @OneToMany
            @JsonIgnore
    List<Match> matchs;

    @Column
    Date created_at;

    @Column
    Date updated_at;

    public Team() {
    }

    public Team(HomeTeam homeTeam) {
        this.id_team = homeTeam.id;
        this.name = homeTeam.name;
        this.crest_path = homeTeam.crest;
    }

    public Team(AwayTeam awayTeam) {
        this.id_team = awayTeam.id;
        this.name = awayTeam.name;
        this.crest_path = awayTeam.crest;
    }
}
