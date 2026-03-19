package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Order;
import com.huydq2005.jersey_shop.entity.User;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@Builder
public class OrderDto {
    private Long id;
    private User user;
    private BigDecimal totalPrice;
    private Order.Status status;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
