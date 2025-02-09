package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserResponseDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;  // The role of the user (ADMIN or MEMBER)
    private boolean isActive;  // Account status (active/inactive)
    private String message;

    // Constructor for error messages
    public RegisterUserResponseDTO(String message) {
        this.message = message;
    }

    // Constructor for basic user details
    public RegisterUserResponseDTO(Long userId, String email, String role, boolean isActive) {
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
    }

    // Constructor for full user details without token
    public RegisterUserResponseDTO(Long userId, String firstName, String lastName, String email, String role, boolean isActive) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
    }

}