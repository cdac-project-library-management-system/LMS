package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.AdminLogRequestDTO;
import com.lms.dto.response.AdminLogResponseDTO;

public interface AdminLogService {
	
    AdminLogResponseDTO createAdminLog(AdminLogRequestDTO dto);
    
    PaginatedResponseDTO<AdminLogResponseDTO> getAdminLogsByAdmin(Long adminId, int page, int size);
    
    PaginatedResponseDTO<AdminLogResponseDTO> getAllAdminLogs(int page, int size);

}
