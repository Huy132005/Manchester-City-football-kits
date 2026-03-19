package com.huydq2005.jersey_shop.service.Imp;

import com.huydq2005.jersey_shop.config.JwtUtil;
import com.huydq2005.jersey_shop.entity.Role;
import com.huydq2005.jersey_shop.entity.User;
import com.huydq2005.jersey_shop.exception.BadRequestException;
import com.huydq2005.jersey_shop.payload.request.LoginRequest;
import com.huydq2005.jersey_shop.payload.request.RegisterRequest;
import com.huydq2005.jersey_shop.payload.response.LoginResponse;
import com.huydq2005.jersey_shop.payload.response.RegisterResponse;
import com.huydq2005.jersey_shop.repository.AuthRepository;
import com.huydq2005.jersey_shop.repository.RoleRepository;
import com.huydq2005.jersey_shop.service.AuthService;
import com.huydq2005.jersey_shop.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthRepository authRepository;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        User user = authRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles()
                .stream()
                .map(r -> r.getName().name())
                .toList();

        String token = jwtUtil.generateToken(
                user.getUsername(),
                roles
        );

        return new LoginResponse(
                "Bearer",
                user.getUsername(),
                user.getEmail(),
                roles
        );
    }
    @Override
    public void logout(String username) {

        System.out.println("User logout: " + username);

        User user = authRepository.findByUsername(username)
                .orElseThrow();

        refreshTokenService.deleteByUserId(user.getId());
    }

    @Override
    public RegisterResponse create(RegisterRequest request) {

        Map<String, String> errors = new HashMap<>();

        if (authRepository.existsByEmail(request.getEmail())) {
            errors.put("email", "Email đã tồn tại");
        }

        if (authRepository.existsByUsername(request.getUsername())) {
            errors.put("username", "Username đã tồn tại");
        }

        if (authRepository.existsByPhone(request.getPhone())) {
            errors.put("phone", "Phone đã tồn tại");
        }

        if (!errors.isEmpty()) {
            throw new BadRequestException(errors);
        }

        // Map request → user
        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword())); // encode
        user.setStatus(User.Status.ACTIVE);

        // Luôn gán role USER
        Role roleUser = roleRepository.findByName(Role.Name.USER)
                .orElseThrow(() -> new RuntimeException("Role USER not found"));
        user.setRoles(Set.of(roleUser));

        authRepository.save(user);

        RegisterResponse response = new RegisterResponse();
        response.setMessage("Registered successfully");
        response.setUsername(user.getUsername());

        return response;
    }
}
