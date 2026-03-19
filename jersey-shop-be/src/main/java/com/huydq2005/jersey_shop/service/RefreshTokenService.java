package com.huydq2005.jersey_shop.service;

import com.huydq2005.jersey_shop.entity.RefreshToken;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(String username);

    RefreshToken verifyExpiration(RefreshToken token);

    RefreshToken findByToken(String token);

    void deleteByUserId(Long userId);
    
}