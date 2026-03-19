package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.ColorDto;
import com.huydq2005.jersey_shop.entity.Color;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColorMapper {
    Color dtoToEntity(ColorDto colorDto);
    ColorDto entityToDto(Color color);
}
