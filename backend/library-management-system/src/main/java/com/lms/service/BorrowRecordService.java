package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.BorrowRecordRequestDTO;
import com.lms.dto.response.BorrowRecordResponseDTO;

public interface BorrowRecordService {
	
    BorrowRecordResponseDTO createBorrowRecord(BorrowRecordRequestDTO borrowRecordRequestDto);
    
    BorrowRecordResponseDTO updateBorrowRecord(Long recordId, BorrowRecordRequestDTO borrowRecordRequestDto);
    
    BorrowRecordResponseDTO getBorrowRecordById(Long recordId);
    
    PaginatedResponseDTO<BorrowRecordResponseDTO> getBorrowRecordsByUser(Long userId, int page, int size);
    
    PaginatedResponseDTO<BorrowRecordResponseDTO> getAllBorrowRecords(int page, int size);
    
}
