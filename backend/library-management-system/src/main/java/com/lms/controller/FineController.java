package com.lms.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.lms.dto.request.FineRequestDTO;
import com.lms.dto.response.FineResponseDTO;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.service.FineService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fines")
@RequiredArgsConstructor
public class FineController {

    private final FineService fineService;
    
    // Create a new fine
    @PostMapping
    public ResponseEntity<FineResponseDTO> createFine(@RequestBody FineRequestDTO fineRequestDTO) {
        FineResponseDTO response = fineService.createFine(fineRequestDTO);
        return ResponseEntity.ok(response);
    }
    
    // Update an existing fine
    @PutMapping("/{fineId}")
    public ResponseEntity<FineResponseDTO> updateFine(@PathVariable Long fineId,
                                                      @RequestBody FineRequestDTO fineRequestDTO) {
        FineResponseDTO response = fineService.updateFine(fineId, fineRequestDTO);
        return ResponseEntity.ok(response);
    }
    
    // Get fine by its ID
    @GetMapping("/{fineId}")
    public ResponseEntity<?> getFineById(@PathVariable Long fineId) {
        try {
        	FineResponseDTO response = fineService.getFineById(fineId);
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errorResponse = new ErrorResponseDTO(
        			"Fine not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    
    // Get fine by associated borrow record ID
    @GetMapping("/borrowRecord/{borrowRecordId}")
    public ResponseEntity<FineResponseDTO> getFineByBorrowRecord(@PathVariable Long borrowRecordId) {
        FineResponseDTO response = fineService.getFineByBorrowRecord(borrowRecordId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public PaginatedResponseDTO<FineResponseDTO> getUserFines(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        return fineService.getAllFinesByCurrentUser(page, size);
    }
    
    // Get paginated list of fines
    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<FineResponseDTO>> getAllFines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<FineResponseDTO> response = fineService.getAllFines(page, size);
        return ResponseEntity.ok(response);
    }
    
}
