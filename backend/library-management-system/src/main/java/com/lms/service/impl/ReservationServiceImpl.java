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
import com.lms.dto.request.ReservationRequestDTO;
import com.lms.dto.response.ReservationResponseDTO;
import com.lms.entities.Reservation;
import com.lms.entities.enums.ReservationStatus;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.BookRepository;
import com.lms.repository.ReservationRepository;
import com.lms.repository.UserRepository;
import com.lms.service.ReservationService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Override
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {
        Reservation reservation = modelMapper.map(dto, Reservation.class);
        reservation.setUser(userRepository.findByIdAndStatusTrue(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        reservation.setBook(bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found")));
        reservation = reservationRepository.save(reservation);
        return modelMapper.map(reservation, ReservationResponseDTO.class);
    }

    @Override
    public ReservationResponseDTO updateReservation(Long reservationId, ReservationRequestDTO dto) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        if (dto.getReservationDate() != null) {
            reservation.setReservationDate(dto.getReservationDate());
        }
        if (dto.getStatus() != null) {
            reservation.setStatus(dto.getStatus());
        }
        reservation = reservationRepository.save(reservation);
        return modelMapper.map(reservation, ReservationResponseDTO.class);
    }

    @Override
    public ReservationResponseDTO getReservationById(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setUserId(reservation.getUser().getId());
        dto.setBookId(reservation.getBook().getId());
        modelMapper.map(reservation, dto);
        return dto;
    }

    @Override
    public PaginatedResponseDTO<ReservationResponseDTO> getReservationsByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> pageResult = reservationRepository.findByUserId(userId, pageable);
        List<ReservationResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(res -> {
                	ReservationResponseDTO dto = modelMapper.map(res, ReservationResponseDTO.class);
                	dto.setUserId(res.getUser().getId());
                	dto.setBookId(res.getBook().getId());
                	return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<ReservationResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

    @Override
    public PaginatedResponseDTO<ReservationResponseDTO> getAllReservations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> pageResult = reservationRepository.findAll(pageable);
        List<ReservationResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(res -> {
                	ReservationResponseDTO dto = modelMapper.map(res, ReservationResponseDTO.class);
                	dto.setUserId(res.getUser().getId());
                	dto.setBookId(res.getBook().getId());
                	return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<ReservationResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }
    
}
