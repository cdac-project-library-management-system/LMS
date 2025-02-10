package com.lms.dto;

import com.lms.entities.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role; // ROLE_ADMIN, ROLE_MEMBER, etc.
    
    public UserDTO(Long id, String email, Role role) {
    	this.id = id;
    	this.email = email;
    	this.role = role;
    }
    
}
