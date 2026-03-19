package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Order;
import com.huydq2005.jersey_shop.entity.ProductVariant;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
@Data
@Builder
public class OrderItemDto {private Long id;
    private Order order;
    private ProductVariant productVariant;
    private int quantity;
    private BigDecimal price;
}
