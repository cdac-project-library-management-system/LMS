package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.RegisterRequest;
import com.lms.dto.UserDTO;
import com.lms.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Register a new user.
     * @param registerRequest User registration request object.
     * @return ResponseEntity containing the registered user details.
     */
    @Operation(summary = "Register a new user", description = "Registers a new user with email and password.")
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterRequest registerRequest) {
        UserDTO newUser = userService.saveUser(registerRequest);
        return ResponseEntity.ok(newUser);
    }

    /**
     * Get user details by email.
     * @param email User email.
     * @return ResponseEntity containing user details.
     */
    @Operation(summary = "Get user details", description = "Fetch user details by email.")
    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

}
