package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {

    private String token;  // JWT token for authentication
    private String message;
    
    public LoginResponseDTO(String message) {
    	this.message = message;
    }

}
