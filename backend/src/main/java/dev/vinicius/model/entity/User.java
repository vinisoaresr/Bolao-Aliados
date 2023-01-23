package dev.vinicius.model.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;

import java.util.Date;
import java.util.List;

@Entity

@Table(name = "[user]", indexes = { @Index(name = "index_mail", unique = true, columnList = "id,mail") })
@UserDefinition
public class User extends PanacheEntity {
    // public enum TypeRoles {
    // User, Admin;
    // }

    @Column
    public String name;

    @Column
    @Username
    public String mail;

    @Column
    @Password
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String password;

    // @Roles
    // @Enumerated(EnumType.STRING)
    // @ElementCollection(targetClass = Roles.class)
    // private List<TypeRoles> roles;
    @Roles
    public String role;

    @Column
    public String avatar;

    @JsonIgnoreProperties("user")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
    public List<Transactions> transactions;

    @Column
    public boolean admin;

    @Column(updatable = true)
    public int score;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date created;

    public User() {
    }

    public boolean isEmpty() {
        return this.id == null && this.mail == null;
    }

    public boolean isNotEmpty() {
        return !isEmpty();
    }
}
