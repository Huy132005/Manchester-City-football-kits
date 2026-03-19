package com.huydq2005.jersey_shop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class PageDto {
    //    @JsonIgnore
    private Integer pageSize;
    //    @JsonIgnore
    private Integer pageNumber;
}