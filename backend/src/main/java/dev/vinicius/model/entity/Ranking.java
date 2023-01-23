package dev.vinicius.model.entity;

import javax.persistence.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.util.Date;

@Entity
public class Ranking extends PanacheEntity {

    @OneToOne
    public User user;

    @Column
    public int score;

    @Column
    public int classification;

    @Column
    public Date created;

    @Column
    public Date updated;

    @Column
    public Date deleted;

    public Ranking(){}

    public Ranking(User user, int classification) {
        this.user = user;
        this.score = user.score;
        this.classification = classification;
        this.created = new Date();
    }

    private void updateRanking(){

    }

}
