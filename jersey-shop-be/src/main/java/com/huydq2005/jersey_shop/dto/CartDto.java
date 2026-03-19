package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartDto {
    private Long id;
    private User user;
}
