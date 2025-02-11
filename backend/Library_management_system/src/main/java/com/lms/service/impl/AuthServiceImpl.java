package com.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.dto.AuthResponse;
import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;
import com.lms.entities.Admin;
import com.lms.entities.Member;
import com.lms.entities.User;
import com.lms.entities.enums.Role;
import com.lms.repository.AdminRepository;
import com.lms.repository.MemberRepository;
import com.lms.repository.UserRepository;
import com.lms.security.JwtUtil;
import com.lms.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final AdminRepository adminRepository;


    @Override
    public AuthResponse register(RegisterRequest request) {
    	
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        

//        User user = new User();
//        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRole(Role.MEMBER);
        
     // Create and save the User entity
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user = userRepository.save(user); // Save the user first

        // Create a Member or Admin based on the role
        if (user.getRole() == Role.MEMBER) {
            Member member = new Member();
            member.setUser(user);  // Link the user
            member.setName(request.getName());
            memberRepository.save(member);  // Save the member
        } else if (user.getRole() == Role.ADMIN) {
            Admin admin = new Admin();
            admin.setUser(user);  // Link the user
            admin.setName(request.getName());
            adminRepository.save(admin);  // Save the admin
        }
        
        return new AuthResponse("Registered Successfully", user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name());
    }
}
