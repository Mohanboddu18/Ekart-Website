package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.dto.AuthRequest;
import com.ekart.dto.AuthResponse;
import com.ekart.dto.RegisterRequest;
import com.ekart.model.User;
import com.ekart.repository.UserRepository;
import com.ekart.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            User user = userRepository.findByEmail(authRequest.getEmail()).orElse(null);

            AuthResponse authResponse = AuthResponse.builder()
                    .token(jwt)
                    .email(user != null ? user.getEmail() : authRequest.getEmail())
                    .name(user != null ? user.getName() : "Valued Customer")
                    .role(user != null ? user.getRole() : "ROLE_USER")
                    .build();

            return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                    .success(true)
                    .message("Login successful")
                    .data(authResponse)
                    .build());

        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.<AuthResponse>builder()
                    .success(false)
                    .message("Invalid email or password")
                    .build());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.<AuthResponse>builder()
                    .success(false)
                    .message("Email is already registered! Please log in.")
                    .build());
        }

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        String jwt = jwtUtils.generateTokenFromEmail(user.getEmail());

        AuthResponse authResponse = AuthResponse.builder()
                .token(jwt)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .build();

        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Registration successful!")
                .data(authResponse)
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(ApiResponse.<User>builder()
                    .success(false)
                    .message("Not authenticated")
                    .build());
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(ApiResponse.<User>builder()
                        .success(true)
                        .message("User details fetched")
                        .data(user)
                        .build()))
                .orElse(ResponseEntity.notFound().build());
    }
}
