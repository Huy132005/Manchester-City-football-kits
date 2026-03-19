package com.huydq2005.jersey_shop.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class LoginResponse {
    private String type = "Bearer";
    private String username;
    private String email;
    private List<String> roles;
}
