package com.huydq2005.jersey_shop.repository;

import com.huydq2005.jersey_shop.entity.RefreshToken;
import com.huydq2005.jersey_shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(User user);
}