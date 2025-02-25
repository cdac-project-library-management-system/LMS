package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.FineRequestDTO;
import com.lms.dto.response.FineResponseDTO;

public interface FineService {
	
    FineResponseDTO createFine(FineRequestDTO dto);
    
    FineResponseDTO updateFine(Long fineId, FineRequestDTO dto);
    
    FineResponseDTO getFineById(Long fineId);
    
    FineResponseDTO getFineByBorrowRecord(Long borrowRecordId);
    
    PaginatedResponseDTO<FineResponseDTO> getAllFines(int page, int size);

    PaginatedResponseDTO<FineResponseDTO> getAllFinesByCurrentUser(int page, int size);

}