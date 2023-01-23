package dev.vinicius.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.Column;
import javax.persistence.Entity;


// TODO: Database OR Config env file ??
@Entity
public class IntegrationServiceURLs extends PanacheEntity {

    @Column
    public String BASE_URL = "";
    @Column
    public String IMPORT_COMPETITION = "";
    @Column
    public CompetitionENUM CompetitionENUM = dev.vinicius.model.entity.CompetitionENUM.BSA;
}

