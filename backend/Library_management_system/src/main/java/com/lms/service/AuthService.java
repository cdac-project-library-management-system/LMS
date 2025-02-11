package com.lms.service;

import com.lms.dto.AuthResponse;
import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;

public interface AuthService {
	
	AuthResponse register(RegisterRequest request);
	
    AuthResponse login(LoginRequest request);

}
