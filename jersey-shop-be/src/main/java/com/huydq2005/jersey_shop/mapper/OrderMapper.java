package com.huydq2005.jersey_shop.mapper;

import com.huydq2005.jersey_shop.dto.OrderDto;
import com.huydq2005.jersey_shop.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order dtoToEntity(OrderDto orderDto);
    OrderDto entityToDto(Order order);
}
