package com.lms.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.request.LoginRequestDTO;
import com.lms.dto.request.RegisterRequestDTO;
import com.lms.dto.request.UserRequestDTO;
import com.lms.dto.response.LoginResponseDTO;
import com.lms.dto.response.RegisterResponseDTO;
import com.lms.dto.response.UserResponseDTO;
import com.lms.service.UserService;
import com.lms.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService; // Used for registration
    private final ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        // Perform authentication
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Generate JWT using the principal (UserDetails)
        String token = jwtUtil.generateJwtToken(authentication);

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setEmail(loginRequest.getEmail());
        // Optionally, include user roles or id if desired
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO registerRequest) {
        // Map registration DTO to UserRequestDTO (if they differ)
        UserRequestDTO userRequest = modelMapper.map(registerRequest, UserRequestDTO.class);
        // Create the user
        UserResponseDTO userResponse = userService.createUser(userRequest);
        RegisterResponseDTO response = new RegisterResponseDTO();
        response.setUserId(userResponse.getId());
        response.setEmail(userResponse.getEmail());
        response.setMessage("Registration successful");
        return ResponseEntity.ok(response);
    }

}
