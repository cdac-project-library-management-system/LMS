package com.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.AdminLogRequestDTO;
import com.lms.dto.response.AdminLogResponseDTO;
import com.lms.entities.AdminLog;
import com.lms.repository.AdminLogRepository;
import com.lms.repository.UserRepository;
import com.lms.service.AdminLogService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminLogServiceImpl implements AdminLogService {

    private final AdminLogRepository adminLogRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public AdminLogResponseDTO createAdminLog(AdminLogRequestDTO dto) {
        AdminLog adminLog = modelMapper.map(dto, AdminLog.class);
        adminLog.setAdmin(userRepository.findByIdAndStatusTrue(dto.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found")));
        adminLog = adminLogRepository.save(adminLog);
        return modelMapper.map(adminLog, AdminLogResponseDTO.class);
    }

    @Override
    public PaginatedResponseDTO<AdminLogResponseDTO> getAdminLogsByAdmin(Long adminId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdminLog> pageResult = adminLogRepository.findByAdminId(adminId, pageable);
        List<AdminLogResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(log -> modelMapper.map(log, AdminLogResponseDTO.class))
                .collect(Collectors.toList());
        PaginatedResponseDTO<AdminLogResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }
    
    @Override
    public PaginatedResponseDTO<AdminLogResponseDTO> getAllAdminLogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdminLog> pageResult = adminLogRepository.findAll(pageable);
        List<AdminLogResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(log -> modelMapper.map(log, AdminLogResponseDTO.class))
                .collect(Collectors.toList());
        
        PaginatedResponseDTO<AdminLogResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }
    
}
