package com.lms.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.dto.request.ChangeUserStatusRequestDTO;
import com.lms.dto.request.LoginRequestDTO;
import com.lms.dto.request.RegisterUserRequestDTO;
import com.lms.dto.response.ChangeUserStatusResponseDTO;
import com.lms.dto.response.LoginResponseDTO;
import com.lms.dto.response.RegisterUserResponseDTO;
import com.lms.exceptions.InvalidCredentialsException;
import com.lms.exceptions.UserAlreadyExistsException;
import com.lms.exceptions.UserNotFoundException;
import com.lms.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account")
    public ResponseEntity<RegisterUserResponseDTO> registerUser(@RequestBody RegisterUserRequestDTO registerUserRequestDTO) {
        try {
            RegisterUserResponseDTO response = userService.registerUser(registerUserRequestDTO);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(new RegisterUserResponseDTO("Email already exists"), HttpStatus.CONFLICT);
        }
    }

    // Login for existing user
    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Returns a JWT token")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            LoginResponseDTO response = userService.loginUser(loginRequestDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (InvalidCredentialsException e) {
            return new ResponseEntity<>(new LoginResponseDTO("Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
    }
    
    
    // Change user status (active/inactive) - Only accessible by Admins
    @PatchMapping("/change-status")
    @Operation(summary = "Change user status", description = "Requires authentication")
    @SecurityRequirement(name = "bearerAuth") // Requires JWT token
    public ResponseEntity<ChangeUserStatusResponseDTO> changeUserStatus(@RequestBody ChangeUserStatusRequestDTO changeUserStatusRequestDTO) {
        try {
            ChangeUserStatusResponseDTO response = userService.changeUserStatus(changeUserStatusRequestDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(new ChangeUserStatusResponseDTO("User not found"), HttpStatus.NOT_FOUND);
        }
    }
    
    
}