package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.CartItemDto;
import com.huydq2005.jersey_shop.entity.CartItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    CartItem dtoToEntity(CartItemDto cartItemDto);
    CartItemDto entityToDto(CartItem cartItem);
}
