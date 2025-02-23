package com.lms.dto.response;

import lombok.Data;

@Data
public class RegisterResponseDTO {
    private Long userId;
    private String email;
    private String message;
}
