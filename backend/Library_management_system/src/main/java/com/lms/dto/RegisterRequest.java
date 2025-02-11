package com.lms.dto;

import com.lms.entities.enums.Role;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role = Role.MEMBER;
}

