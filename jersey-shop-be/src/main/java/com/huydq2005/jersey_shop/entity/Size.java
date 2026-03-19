package com.huydq2005.jersey_shop.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "sizes")
public class Size {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
