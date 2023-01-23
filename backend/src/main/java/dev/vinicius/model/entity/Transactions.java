package dev.vinicius.model.entity;

import javax.persistence.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "transactions")
// todo check this
// @Table(name = "transactions",
//     uniqueConstraints=
//         @UniqueConstraint(columnNames={"user_id", "match_id"})
// )
public class Transactions extends PanacheEntity {

    // todo check this
    @OneToOne()
    public Match match;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    public User user;

    @Column(nullable = false)
    public Integer calculed_score = 0;

    @Column(name = "goals_homeTeam", nullable = false)
    public Integer goals_homeTeam = 0;

    @Column(name = "goals_awayTeam", nullable = false)
    public Integer goals_awayTeam = 0;

    @Column(nullable = false)
    public Date created = new Date();

    @Column(nullable = false)
    public Date updated = new Date();

    @Column(nullable = true)
    public Date updatedAtByResource = new Date();

    @Column(nullable = false)
    public UUID hash;

    public UUID generateUUID() {
        return UUID.randomUUID();
    }

    @PrePersist
    public void prePersist() {
        if (hash == null) {
            hash = generateUUID();
        }
        this.created = new Date();
        this.updated = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        this.hash = generateUUID();
        this.updated = new Date();
    }

}
