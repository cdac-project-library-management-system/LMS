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
import com.lms.dto.request.ReservationRequestDTO;
import com.lms.dto.response.ReservationResponseDTO;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    
    // Create a new reservation
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationRequestDTO dto) {
        try {
        	ReservationResponseDTO response = reservationService.createReservation(dto);
            response.setUserId(dto.getUserId());
            response.setBookId(dto.getBookId());
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO error = new ErrorResponseDTO(ex.getMessage(), null);
        	return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        } catch(Exception ex) {
        	ex.printStackTrace();
        	ErrorResponseDTO error = new ErrorResponseDTO("An unexpected error occured", null);
        	return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Update an existing reservation
    @PutMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDTO> updateReservation(@PathVariable Long reservationId,
                                                                    @RequestBody ReservationRequestDTO dto) {
        ReservationResponseDTO response = reservationService.updateReservation(reservationId, dto);
        return ResponseEntity.ok(response);
    }
    
    // Get a reservation by ID
    @GetMapping("/{reservationId}")
    public ResponseEntity<?> getReservationById(@PathVariable Long reservationId) {
        try {
        	ReservationResponseDTO response = reservationService.getReservationById(reservationId);
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errorResponse = new ErrorResponseDTO(
        			"Reservation not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    
    // Get paginated reservations for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<PaginatedResponseDTO<ReservationResponseDTO>> getReservationsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<ReservationResponseDTO> response = reservationService.getReservationsByUser(userId, page, size);
        return ResponseEntity.ok(response);
    }
    
    // Get paginated list of all reservations
    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<ReservationResponseDTO>> getAllReservations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<ReservationResponseDTO> response = reservationService.getAllReservations(page, size);
        return ResponseEntity.ok(response);
    }
    
}
