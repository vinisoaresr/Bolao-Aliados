package dev.vinicius.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@NamedQueries(@NamedQuery(name = "AccountRecovery.findValidUUID", query = "from AccountRecovery where requiredByUser = ?1 and generatedAt > ?2"))
public class AccountRecovery extends PanacheEntity {

    @OneToOne
    public User requiredByUser;

    @Column(nullable = false, unique = true)
    public final String uuid = UUID.randomUUID().toString().replace("-", "");

    @Column(nullable = false)
    public boolean used = false;

    @Column(nullable = false)
    public Date generatedAt = new Date();

    @Column
    public Date passwordResetedAt;

    @Column
    public Date sendMailAt;

    public AccountRecovery() {
    }

    public AccountRecovery(User user) {
        this.requiredByUser = user;
    }

    static public AccountRecovery getValidUUID(User user, String uuid) {
        return find("#AccountRecovery.findValidUUID", user, uuid).firstResult();
    }
}
