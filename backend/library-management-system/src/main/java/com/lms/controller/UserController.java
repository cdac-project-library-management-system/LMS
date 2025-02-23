package com.lms.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.ErrorResponseDTO;
import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.UserRequestDTO;
import com.lms.dto.response.UserResponseDTO;
import com.lms.exceptions.ApiException;
import com.lms.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {

    private final UserService userService;
    
    // Create a new user
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDto) {
        UserResponseDTO response = userService.createUser(userRequestDto);
        return ResponseEntity.ok(response);
    }
    
    // Update an existing user
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long userId,
                                                      @RequestBody UserRequestDTO userRequestDto) {
        UserResponseDTO response = userService.updateUser(userId, userRequestDto);
        return ResponseEntity.ok(response);
    }
    
    // Get a user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            UserResponseDTO userResponse = userService.getUserById(userId);
            return ResponseEntity.ok(userResponse);
        } catch (ApiException ex) {
            ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                "User not found",
                Collections.singletonList(ex.getMessage())
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    
    // Get all active users with pagination
    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<UserResponseDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<UserResponseDTO> response = userService.getAllUsers(page, size);
        return ResponseEntity.ok(response);
    }
    
    // Soft delete a user
    @DeleteMapping
    ("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable
    		Long userId) {
        userService.softDeleteUser(userId);
        return ResponseEntity.noContent().build();
    }
    
}
