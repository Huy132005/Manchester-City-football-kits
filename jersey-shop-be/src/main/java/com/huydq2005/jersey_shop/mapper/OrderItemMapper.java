package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.OrderDto;
import com.huydq2005.jersey_shop.dto.OrderItemDto;
import com.huydq2005.jersey_shop.entity.Order;
import com.huydq2005.jersey_shop.entity.OrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    OrderItem dtoToEntity(OrderItemDto orderItemDto);
    OrderItemDto entityToDto(OrderItem orderItem);
}
