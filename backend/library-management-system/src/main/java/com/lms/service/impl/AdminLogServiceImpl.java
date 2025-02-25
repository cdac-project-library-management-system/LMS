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
        // Map DTO to Entity
        AdminLog adminLog = new AdminLog();
        adminLog.setAdmin(userRepository.findByIdAndStatusTrue(dto.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found")));
        adminLog.setAction(dto.getAction());
        adminLog.setEntityType(dto.getEntityType());
        adminLog.setEntityId(dto.getEntityId());
        adminLog.setTimestamp(dto.getTimestamp());

        // Save the log entry
        adminLog = adminLogRepository.save(adminLog);

        // Map Entity to Response DTO
        AdminLogResponseDTO response = new AdminLogResponseDTO();
        response.setId(adminLog.getId());
        response.setAdminId(adminLog.getAdmin().getId());
        response.setAction(adminLog.getAction());
        response.setEntityType(adminLog.getEntityType());
        response.setEntityId(adminLog.getEntityId());
        response.setTimestamp(adminLog.getTimestamp());

        return response;
    }

    @Override
    public PaginatedResponseDTO<AdminLogResponseDTO> getAdminLogsByAdmin(Long adminId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdminLog> pageResult = adminLogRepository.findByAdminId(adminId, pageable);

        // Map Page<AdminLog> to List<AdminLogResponseDTO>
        List<AdminLogResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(log -> modelMapper.map(log, AdminLogResponseDTO.class))
                .collect(Collectors.toList());

        // Build paginated response
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

        // Map Page<AdminLog> to List<AdminLogResponseDTO>
        List<AdminLogResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(log -> modelMapper.map(log, AdminLogResponseDTO.class))
                .collect(Collectors.toList());

        // Build paginated response
        PaginatedResponseDTO<AdminLogResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());

        return response;
    }
}