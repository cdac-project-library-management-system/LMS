package com.lms.service;

import com.lms.dto.request.ChangeUserStatusRequestDTO;
import com.lms.dto.request.LoginRequestDTO;
import com.lms.dto.request.RegisterUserRequestDTO;
import com.lms.dto.response.ChangeUserStatusResponseDTO;
import com.lms.dto.response.LoginResponseDTO;
import com.lms.dto.response.RegisterUserResponseDTO;

public interface UserService {

    RegisterUserResponseDTO registerUser(RegisterUserRequestDTO registerUserRequestDTO);

    LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO);

    ChangeUserStatusResponseDTO changeUserStatus(ChangeUserStatusRequestDTO changeUserStatusRequestDTO);
}

