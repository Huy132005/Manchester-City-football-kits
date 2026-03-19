package com.huydq2005.jersey_shop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private SizeGroup size_group;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private BigDecimal price;
    private String brand;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum SizeGroup{
        CHILDREN, ADULT;
    }
}
