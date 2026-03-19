package com.huydq2005.jersey_shop.service;

import com.huydq2005.jersey_shop.payload.request.LoginRequest;
import com.huydq2005.jersey_shop.payload.request.RegisterRequest;
import com.huydq2005.jersey_shop.payload.response.LoginResponse;
import com.huydq2005.jersey_shop.payload.response.RegisterResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    void logout(String username);
    RegisterResponse create(RegisterRequest registerRequest);
}
