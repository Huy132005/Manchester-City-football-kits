package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.CategoryDto;
import com.huydq2005.jersey_shop.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category dtoToEntity(CategoryDto categoryDto);
    CategoryDto entityToDto(Category category);
}
