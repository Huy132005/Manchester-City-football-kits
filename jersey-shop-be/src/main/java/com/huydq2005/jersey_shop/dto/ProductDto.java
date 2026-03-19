package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Category;
import com.huydq2005.jersey_shop.entity.Product;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Product.SizeGroup size_group;
    private Category category;
    private BigDecimal price;
    private String brand;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
