package com.lms.dto.request;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String profilePicUrl;
}
