package dev.vinicius.model.entity;


import javax.persistence.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.util.Date;
import java.util.List;

@Entity (name = "[group]")
public class Group extends PanacheEntity {

    @Column
    public String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "group", fetch = FetchType.EAGER)
    public List<Team> teams;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "group", fetch = FetchType.EAGER)
    public List<Match> matchs;

    @Column
    private Date created;

    @Column
    private Date updated;

    public Group(){}
}
