package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Color;
import com.huydq2005.jersey_shop.entity.Product;
import com.huydq2005.jersey_shop.entity.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductVariantDto {
    private Long id;
    private Product product;
    private Size size;
    private Color color;
    private int quantity;
    private String sku;
}
