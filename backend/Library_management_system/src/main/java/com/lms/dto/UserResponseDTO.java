package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String mobileNumber;
    private boolean isActive;
}
