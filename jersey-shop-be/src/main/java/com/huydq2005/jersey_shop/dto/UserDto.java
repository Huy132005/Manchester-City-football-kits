package com.huydq2005.jersey_shop.dto;

import com.huydq2005.jersey_shop.entity.Role;
import com.huydq2005.jersey_shop.entity.User;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class UserDto {
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder.Default
    private Set<String> roles = new HashSet<>();
}
