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
import com.lms.dto.request.BorrowRecordRequestDTO;
import com.lms.dto.request.ReservationRequestDTO;
import com.lms.dto.response.ReservationResponseDTO;
import com.lms.entities.Reservation;
import com.lms.entities.enums.BorrowStatus;
import com.lms.entities.enums.ReservationStatus;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.BookRepository;
import com.lms.repository.ReservationRepository;
import com.lms.repository.UserRepository;
import com.lms.service.BorrowRecordService;
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
    private final BorrowRecordService borrowRecordService;

    @Override
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {
        Reservation reservation = modelMapper.map(dto, Reservation.class);
        reservation.setUser(userRepository.findByIdAndStatusTrue(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        reservation.setBook(bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found")));

        reservation.setStatus(ReservationStatus.PENDING);
        reservation = reservationRepository.save(reservation);

        return modelMapper.map(reservation, ReservationResponseDTO.class);
    }

    @Override
    public ReservationResponseDTO updateReservation(Long reservationId, ReservationRequestDTO dto) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        if (dto.getReservationDate() != null) {
            reservation.setReservationDate(dto.getReservationDate());
        }

        if (dto.getStatus() != null) {
            ReservationStatus status = dto.getStatus();
            reservation.setStatus(status);

            switch (status) {
                case COMPLETED:
                    BorrowRecordRequestDTO borrowDTO = new BorrowRecordRequestDTO();
                    borrowDTO.setUserId(reservation.getUser().getId());
                    borrowDTO.setBookId(reservation.getBook().getId());
                    borrowDTO.setStatus(BorrowStatus.BORROWED);
                    borrowRecordService.createBorrowRecord(borrowDTO);
                    break;
                case CANCELLED:
                    // Pending, yet to be implemented
                    break;
                default:
                    break;
            }
        }

        reservation = reservationRepository.save(reservation);
        ReservationResponseDTO response = new ReservationResponseDTO();
        response.setUserId(reservation.getUser().getId());
        response.setBookId(reservation.getBook().getId());
        modelMapper.map(reservation, response);
        return response;
    }

    @Override
    public ReservationResponseDTO getReservationById(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        ReservationResponseDTO response = new ReservationResponseDTO();
        response.setUserId(reservation.getUser().getId());
        response.setBookId(reservation.getBook().getId());
        modelMapper.map(reservation, response);
        return response;
    }

    @Override
    public PaginatedResponseDTO<ReservationResponseDTO> getReservationsByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> pageResult = reservationRepository.findByUserId(userId, pageable);

        List<ReservationResponseDTO> dtos = pageResult.getContent().stream()
                .map(reservation -> {
                	ReservationResponseDTO response = new ReservationResponseDTO();
                	response.setUserId(reservation.getUser().getId());
                	response.setBookId(reservation.getBook().getId());
                	modelMapper.map(reservation, response);
                	return response;
                })
                .collect(Collectors.toList());

        return createPaginatedResponse(pageResult, dtos);
    }

    @Override
    public PaginatedResponseDTO<ReservationResponseDTO> getAllReservations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> pageResult = reservationRepository.findAll(pageable);

        List<ReservationResponseDTO> dtos = pageResult.getContent().stream()
                .map(reservation -> {
                	ReservationResponseDTO response = new ReservationResponseDTO();
                	response.setUserId(reservation.getUser().getId());
                	response.setBookId(reservation.getBook().getId());
                	modelMapper.map(reservation, response);
                	return response;
                })
                .collect(Collectors.toList());

        return createPaginatedResponse(pageResult, dtos);
    }

    private PaginatedResponseDTO<ReservationResponseDTO> createPaginatedResponse(Page<Reservation> pageResult, List<ReservationResponseDTO> dtos) {
        return new PaginatedResponseDTO<>(dtos, pageResult.getNumber(), pageResult.getSize(), pageResult.getTotalElements(), pageResult.getTotalPages());
    }
}
