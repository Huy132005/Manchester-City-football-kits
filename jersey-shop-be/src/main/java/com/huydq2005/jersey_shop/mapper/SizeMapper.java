package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.SizeDto;
import com.huydq2005.jersey_shop.entity.Size;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SizeMapper {
    Size dtoToEntity(SizeDto sizeDto);
    SizeDto entityToDto(Size size);
}
