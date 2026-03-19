package com.huydq2005.jersey_shop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    private Name name;

    @ManyToMany(mappedBy = "roles")
    private List<User> userList;

    public enum Name {
        USER, ADMIN
    }
}
