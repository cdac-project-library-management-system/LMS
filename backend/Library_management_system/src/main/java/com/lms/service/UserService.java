package com.lms.service;

import com.lms.dto.RegisterRequest;
import com.lms.dto.UserDTO;

public interface UserService {
	
	UserDTO saveUser(RegisterRequest registerUser);
	
    UserDTO getUserByEmail(String email);

}
