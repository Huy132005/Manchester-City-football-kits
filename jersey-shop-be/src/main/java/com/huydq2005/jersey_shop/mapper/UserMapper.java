package com.huydq2005.jersey_shop.mapper;


import com.huydq2005.jersey_shop.dto.UserDto;
import com.huydq2005.jersey_shop.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
     User dtoToEntity(UserDto userDto);
     UserDto entityToDto(User user);
}