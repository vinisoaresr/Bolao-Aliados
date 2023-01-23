package dev.vinicius.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.*;
import java.util.List;

@Entity
public class Competition extends PanacheEntity {

    @Column
    public Integer id_competition;

    @Column
    public String name;

    @Column
    public String type;

    @Column
    public String emblem;

    //@JsonIgnoreProperties("user")
    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    public List<Match> matches;
}
