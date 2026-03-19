package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Cart;
import com.huydq2005.jersey_shop.entity.ProductVariant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDto {
    private Long id;
    private Cart cart;
    private ProductVariant productVariant;
    private int quantity;
}
