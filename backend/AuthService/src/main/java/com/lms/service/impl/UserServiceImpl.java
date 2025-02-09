package com.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.config.JwtTokenProvider;
import com.lms.dto.request.ChangeUserStatusRequestDTO;
import com.lms.dto.request.LoginRequestDTO;
import com.lms.dto.request.RegisterUserRequestDTO;
import com.lms.dto.response.ChangeUserStatusResponseDTO;
import com.lms.dto.response.LoginResponseDTO;
import com.lms.dto.response.RegisterUserResponseDTO;
import com.lms.entities.User;
import com.lms.entities.enums.Role;
import com.lms.exceptions.InvalidCredentialsException;
import com.lms.exceptions.UserAlreadyExistsException;
import com.lms.exceptions.UserNotFoundException;
import com.lms.repository.UserRepository;
import com.lms.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public RegisterUserResponseDTO registerUser(RegisterUserRequestDTO registerUserRequestDTO) {
        // Check if email already exists
        if (userRepository.findByEmail(registerUserRequestDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        // Validate role (ensure it's not null)
        Role role = registerUserRequestDTO.getRole();
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }

        // Create a new user entity
        User user = new User();
        user.setEmail(registerUserRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerUserRequestDTO.getPassword())); // Hash password
        user.setRole(role); // Set validated role
        user.setActive(registerUserRequestDTO.isActive());

        // Save user to the database
        userRepository.save(user);

        // Return the response DTO with the token
        return new RegisterUserResponseDTO(
            user.getId(),
            registerUserRequestDTO.getFirstName(), // Use firstName from request
            registerUserRequestDTO.getLastName(),  // Use lastName from request
            user.getEmail(),
            user.getRole().toString(), // Convert Role enum to String for the response
            user.isActive()
        );
    }

    @Override
    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        // Check password match
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        // Generate JWT token using the email
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().toString());  // Pass email instead of the whole user object and user role

        // Return the login response with the token
        return new LoginResponseDTO(token, "Login successful");
    }

    @Override
    public ChangeUserStatusResponseDTO changeUserStatus(ChangeUserStatusRequestDTO changeUserStatusRequestDTO) {
        // Find user by id
        User user = userRepository.findById(changeUserStatusRequestDTO.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Update user status
        user.setActive(changeUserStatusRequestDTO.isActive());

        // Save updated user to the database
        userRepository.save(user);

        // Return the updated status response
        return new ChangeUserStatusResponseDTO(user.getId(), user.isActive(), "User status updated successfully");
    }
}

