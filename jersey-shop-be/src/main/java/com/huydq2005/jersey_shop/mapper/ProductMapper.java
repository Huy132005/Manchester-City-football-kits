package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.ProductDto;
import com.huydq2005.jersey_shop.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product dtoToEntity(ProductDto productDto);
    ProductDto entityToDto(Product product);
}
