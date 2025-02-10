package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.AuthResponse;
import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;
import com.lms.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * User Registration Endpoint
     * Registers a new user with the provided details.
     * 
     * @param registerRequest The registration request containing user details.
     * @return A response containing authentication details (e.g., JWT token).
     */
    @Operation(summary = "User Registration", description = "Registers a new user and returns authentication details.")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * User Login Endpoint
     * Authenticates a user with the provided credentials.
     * 
     * @param authRequest The login request containing email and password.
     * @return A response containing authentication details (e.g., JWT token).
     */
    @Operation(summary = "User Login", description = "Authenticates a user and returns authentication details.")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest authRequest) {
        AuthResponse response = authService.login(authRequest);
        return ResponseEntity.ok(response);
    }
}
