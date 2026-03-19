package com.huydq2005.jersey_shop.controller;

import com.huydq2005.jersey_shop.config.JwtUtil;
import com.huydq2005.jersey_shop.entity.RefreshToken;
import com.huydq2005.jersey_shop.payload.request.LoginRequest;
import com.huydq2005.jersey_shop.payload.request.RegisterRequest;
import com.huydq2005.jersey_shop.payload.response.AuthResponse;
import com.huydq2005.jersey_shop.payload.response.LoginResponse;
import com.huydq2005.jersey_shop.payload.response.LoginResultResponse;
import com.huydq2005.jersey_shop.payload.response.RegisterResponse;
import com.huydq2005.jersey_shop.service.AuthService;
import com.huydq2005.jersey_shop.service.Imp.CustomUserDetailsService;
import com.huydq2005.jersey_shop.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Validated
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class LoginController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody @Valid RegisterRequest request) {
        return authService.create(request);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(request.getUsername());

            String accessToken = jwtUtil.generateToken(
                    userDetails.getUsername(),
                    userDetails.getAuthorities()
                            .stream()
                            .map(a -> a.getAuthority())
                            .toList()
            );

            RefreshToken refreshToken =
                    refreshTokenService.createRefreshToken(request.getUsername());

            long timeToLive = jwtUtil.getExpirationTime(accessToken);

            AuthResponse authResponse = new AuthResponse(
                    accessToken,
                    refreshToken.getToken(),
                    timeToLive
            );

            LoginResponse loginResponse = new LoginResponse(
                    "Bearer",
                    userDetails.getUsername(),
                    "email",
                    userDetails.getAuthorities()
                            .stream()
                            .map(a -> a.getAuthority())
                            .toList()
            );

            return ResponseEntity.ok(new LoginResultResponse(authResponse, loginResponse));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Sai tài khoản hoặc mật khẩu");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetails userDetails) {

        authService.logout(userDetails.getUsername());

        return ResponseEntity.ok("Logout successful");
    }
}