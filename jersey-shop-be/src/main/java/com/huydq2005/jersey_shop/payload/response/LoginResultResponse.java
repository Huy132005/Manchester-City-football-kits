package com.huydq2005.jersey_shop.payload.response;

public class LoginResultResponse {

    private AuthResponse auth;
    private LoginResponse user;

    public LoginResultResponse(AuthResponse auth, LoginResponse user) {
        this.auth = auth;
        this.user = user;
    }

    public AuthResponse getAuth() {
        return auth;
    }

    public LoginResponse getUser() {
        return user;
    }

    public void setAuth(AuthResponse auth) {
        this.auth = auth;
    }

    public void setUser(LoginResponse user) {
        this.user = user;
    }
}