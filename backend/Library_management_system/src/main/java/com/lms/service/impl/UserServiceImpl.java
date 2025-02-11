package com.lms.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.dto.RegisterRequest;
import com.lms.dto.UserDTO;
import com.lms.entities.User;
import com.lms.entities.enums.Role;
import com.lms.repository.UserRepository;
import com.lms.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
//    private final JwtUtil jwtUtil;

    @Override
    public UserDTO saveUser(RegisterRequest registerUser) {
        // Check if user already exists
        if (userRepository.findByEmail(registerUser.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }

        // Create new user entity
        User newUser = new User();
        newUser.setEmail(registerUser.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerUser.getPassword())); // Encrypt password
        newUser.setRole(Role.MEMBER); // Default to MEMBER

        // Save user to the database
        User savedUser = userRepository.save(newUser);

        // Return DTO with token
        return new UserDTO(savedUser.getId(), savedUser.getEmail(), savedUser.getRole());
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user.getId(), user.getEmail(), user.getRole());
    }
}
