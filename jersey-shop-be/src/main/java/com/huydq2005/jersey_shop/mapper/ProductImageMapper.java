package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.ProductImageDto;
import com.huydq2005.jersey_shop.entity.ProductImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImage dtoToEntity(ProductImageDto productImageDto);
    ProductImageDto entityToDto(ProductImage productImage);
}
