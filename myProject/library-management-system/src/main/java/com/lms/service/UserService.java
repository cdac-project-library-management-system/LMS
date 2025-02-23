package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.UserRequestDTO;
import com.lms.dto.response.UserResponseDTO;

public interface UserService {
	
    UserResponseDTO createUser(UserRequestDTO userRequestDto);
    
    UserResponseDTO updateUser(Long userId, UserRequestDTO userRequestDto);
    
    UserResponseDTO getUserById(Long userId);
    
    PaginatedResponseDTO<UserResponseDTO> getAllUsers(int page, int size);
    
    void softDeleteUser(Long userId);
    
}
