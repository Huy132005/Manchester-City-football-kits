package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.ProductVariantDto;
import com.huydq2005.jersey_shop.entity.ProductVariant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    ProductVariant dtoToEntity(ProductVariantDto productVariantDto);
    ProductVariantDto entityToDto(ProductVariant productVariant);
}
