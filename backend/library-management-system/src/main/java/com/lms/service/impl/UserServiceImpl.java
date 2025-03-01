package com.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.UserRequestDTO;
import com.lms.dto.response.UserResponseDTO;
import com.lms.entities.User;
import com.lms.entities.enums.Role;
import com.lms.exceptions.ApiException;
import com.lms.repository.UserRepository;
import com.lms.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO createUser(UserRequestDTO userRequestDto) {
        // Map request DTO to entity
        User user = modelMapper.map(userRequestDto, User.class);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(Role.ROLE_USER);
        user.setStatus(true); // Active by default
        user = userRepository.save(user);
        // Map entity to response DTO
        return modelMapper.map(user, UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO updateUser(Long userId, UserRequestDTO userRequestDto) {
        User user = userRepository.findByIdAndStatusTrue(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Update fields manually or using ModelMapper (here we update fields manually)
        user.setEmail(userRequestDto.getEmail());
        if (userRequestDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        }
        user.setFullName(userRequestDto.getFullName());
        user.setPhoneNumber(userRequestDto.getPhoneNumber());
        user.setAddress(userRequestDto.getAddress());
        user.setProfilePicUrl(userRequestDto.getProfilePicUrl());
        user.setRole(userRequestDto.getRole());
        user = userRepository.save(user);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO getUserById(Long userId) {
        User user = userRepository.findByIdAndStatusTrue(userId)
                .orElseThrow(() -> new ApiException("User not found"));
        return modelMapper.map(user, UserResponseDTO.class);
    }

    @Override
    public PaginatedResponseDTO<UserResponseDTO> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> pageResult = userRepository.findAllByStatusTrue(pageable);
        List<UserResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .collect(Collectors.toList());
        PaginatedResponseDTO<UserResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

    public void softDeleteUser(Long userId) {
        userRepository.softDeleteById(userId);
    }
    
}
