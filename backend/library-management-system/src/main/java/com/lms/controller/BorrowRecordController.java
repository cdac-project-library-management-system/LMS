package com.lms.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.ErrorResponseDTO;
import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.BorrowRecordRequestDTO;
import com.lms.dto.response.BorrowRecordResponseDTO;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.service.BorrowRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/borrowRecords")
@RequiredArgsConstructor
public class BorrowRecordController {

    private final BorrowRecordService borrowRecordService;
    
    // Create a new borrow record
    @PostMapping
    public ResponseEntity<?> createBorrowRecord(@RequestBody BorrowRecordRequestDTO dto) {
        try {
        	BorrowRecordResponseDTO response = borrowRecordService.createBorrowRecord(dto);
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errResp = new ErrorResponseDTO(
        			"Resource not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errResp, HttpStatus.NOT_FOUND);
        }
    }
    
    // Update an existing borrow record
    @PutMapping("/{recordId}")
    public ResponseEntity<?> updateBorrowRecord(@PathVariable Long recordId,
                                                                      @RequestBody BorrowRecordRequestDTO dto) {
        try {
        	BorrowRecordResponseDTO response = borrowRecordService.updateBorrowRecord(recordId, dto);
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errResp = new ErrorResponseDTO(
        			"Record not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errResp, HttpStatus.NOT_FOUND);
        }
    }
    
    // Get a borrow record by ID
    @GetMapping("/{recordId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<BorrowRecordResponseDTO> getBorrowRecordById(@PathVariable Long recordId) {
        BorrowRecordResponseDTO response = borrowRecordService.getBorrowRecordById(recordId);
        return ResponseEntity.ok(response);
    }
    
    // Get paginated borrow records for a specific user
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<PaginatedResponseDTO<BorrowRecordResponseDTO>> getBorrowRecordsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<BorrowRecordResponseDTO> response = borrowRecordService.getBorrowRecordsByUser(userId, page, size);
        return ResponseEntity.ok(response);
    }
    
    // Get all borrow records with pagination
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaginatedResponseDTO<BorrowRecordResponseDTO>> getAllBorrowRecords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<BorrowRecordResponseDTO> response = borrowRecordService.getAllBorrowRecords(page, size);
        return ResponseEntity.ok(response);
    }
    
}
