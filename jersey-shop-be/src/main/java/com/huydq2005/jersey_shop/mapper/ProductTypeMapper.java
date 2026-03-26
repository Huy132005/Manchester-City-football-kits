package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.ColorDto;
import com.huydq2005.jersey_shop.entity.ProductType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColorMapper {
    ProductType dtoToEntity(ColorDto colorDto);
    ColorDto entityToDto(ProductType color);
}
