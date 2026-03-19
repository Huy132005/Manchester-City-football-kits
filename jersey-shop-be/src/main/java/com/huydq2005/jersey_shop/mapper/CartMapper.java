package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.CartDto;
import com.huydq2005.jersey_shop.entity.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    Cart dtoToEntity(CartDto cartDto);
    CartDto entityToDto(Cart cart);
}
