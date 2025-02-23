package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.ReservationRequestDTO;
import com.lms.dto.response.ReservationResponseDTO;

public interface ReservationService {
	
	ReservationResponseDTO createReservation(ReservationRequestDTO dto);
    
	ReservationResponseDTO updateReservation(Long reservationId, ReservationRequestDTO dto);
    
	ReservationResponseDTO getReservationById(Long reservationId);
    
	PaginatedResponseDTO<ReservationResponseDTO> getReservationsByUser(Long userId, int page, int size);
    
	PaginatedResponseDTO<ReservationResponseDTO> getAllReservations(int page, int size);

}
