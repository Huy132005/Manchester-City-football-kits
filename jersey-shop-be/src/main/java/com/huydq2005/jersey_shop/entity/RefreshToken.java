package com.huydq2005.jersey_shop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.Instant;
@Data
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue
    private Long id;

    private String token;

    private Instant expiredAt;

    @ManyToOne
    private User user;

    private Instant createdAt;
}