package com.huydq2005.jersey_shop.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ColorDto {
    private Long id;
    private String name;
    private String code;
}
