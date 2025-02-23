package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.response.AdminLogResponseDTO;
import com.lms.service.AdminLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/adminLogs")
@RequiredArgsConstructor
public class AdminLogController {

    private final AdminLogService adminLogService;
    
    // Get paginated admin logs by admin ID
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<PaginatedResponseDTO<AdminLogResponseDTO>> getAdminLogsByAdmin(
            @PathVariable Long adminId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<AdminLogResponseDTO> response = adminLogService.getAdminLogsByAdmin(adminId, page, size);
        return ResponseEntity.ok(response);
    }
    
    // Optionally, you can create an endpoint to retrieve all admin logs
    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<AdminLogResponseDTO>> getAllAdminLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<AdminLogResponseDTO> response = adminLogService.getAllAdminLogs(page, size);
        return ResponseEntity.ok(response);
    }
    
}
