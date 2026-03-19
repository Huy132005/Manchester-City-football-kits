package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImageDto {
    private Long id;
    private Product product;
    private String imageURL;
}
