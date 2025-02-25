package com.lms.service.impl;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.FineRequestDTO;
import com.lms.dto.response.FineResponseDTO;
import com.lms.entities.BorrowRecord;
import com.lms.entities.Fine;
import com.lms.entities.User;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.BorrowRecordRepository;
import com.lms.repository.FineRepository;
import com.lms.repository.UserRepository;
import com.lms.service.FineService;
import com.lms.utils.FineCalculator;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public FineResponseDTO createFine(FineRequestDTO dto) {
        Fine fine = new Fine();
        BorrowRecord borrowRecord = borrowRecordRepository.findById(dto.getBorrowRecordId())
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));
        
        fine.setBorrowRecord(borrowRecord);

        BigDecimal fineAmount = FineCalculator.calculateFine(borrowRecord.getDueDate(), borrowRecord.getReturnDate());
        fine.setFineAmount(fineAmount);
        fine.setDaysOverdue(dto.getDaysOverdue());
        fine.setStatus(dto.getStatus());
        
        fine = fineRepository.save(fine);
        return modelMapper.map(fine, FineResponseDTO.class);
    }

    @Override
    public FineResponseDTO updateFine(Long fineId, FineRequestDTO dto) {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new RuntimeException("Fine not found"));

        // Optionally update status from dto
        fine.setStatus(dto.getStatus());

        // Recalculate fine using FineCalculator
        BorrowRecord borrowRecord = fine.getBorrowRecord();
        if (borrowRecord.getReturnDate() != null && borrowRecord.getReturnDate().isAfter(borrowRecord.getDueDate())) {
            long daysOverdue = ChronoUnit.DAYS.between(borrowRecord.getDueDate(), borrowRecord.getReturnDate());
            fine.setDaysOverdue((int) daysOverdue);
            fine.setFineAmount(FineCalculator.calculateFine(borrowRecord.getDueDate(), borrowRecord.getReturnDate()));
        } else {
            fine.setDaysOverdue(0);
            fine.setFineAmount(BigDecimal.ZERO);
        }

        fine = fineRepository.save(fine);
        FineResponseDTO response = new FineResponseDTO();
        response.setBorrowRecordId(fine.getBorrowRecord().getId());
        modelMapper.map(fine, response);
        return response;
    }

    @Override
    public FineResponseDTO getFineById(Long fineId) {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new ResourceNotFoundException("Fine not found"));
        FineResponseDTO dto = new FineResponseDTO();
        dto.setBorrowRecordId(fine.getBorrowRecord().getId());
        modelMapper.map(fine, dto);
        return dto;
    }

    @Override
    public FineResponseDTO getFineByBorrowRecord(Long borrowRecordId) {
        Fine fine = fineRepository.findByBorrowRecordId(borrowRecordId)
                .orElseThrow(() -> new RuntimeException("Fine not found for this borrow record"));
        FineResponseDTO dto = new FineResponseDTO();
        dto.setBorrowRecordId(fine.getBorrowRecord().getId());
        modelMapper.map(fine, dto);
        return dto;
    }
    
    @Override
    public PaginatedResponseDTO<FineResponseDTO> getAllFinesByCurrentUser(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        // Get authenticated user's details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming username = email

        // Fetch the user from DB (or use JWT claims if you store userId in token)
        User user = userRepository.findByEmailAndStatusTrue(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch paginated fines for the user
        Page<Fine> finePage = fineRepository.findAllFinesByUserId(user.getId(), pageable);

        // Convert entities to DTOs
        List<FineResponseDTO> dtos = finePage.getContent().stream()
            .map(fine -> {
                FineResponseDTO response = new FineResponseDTO();
                response.setBorrowRecordId(fine.getBorrowRecord().getId());
                modelMapper.map(fine, response);
                return response;
            })
            .collect(Collectors.toList());

        // Create paginated response
        PaginatedResponseDTO<FineResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(finePage.getNumber());
        response.setPageSize(finePage.getSize());
        response.setTotalItems(finePage.getTotalElements());
        response.setTotalPages(finePage.getTotalPages());

        return response;
    }

    @Override
    public PaginatedResponseDTO<FineResponseDTO> getAllFines(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Fine> pageResult = fineRepository.findAll(pageable);
        List<FineResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(fine -> {
                	FineResponseDTO response = new FineResponseDTO();
                	response.setBorrowRecordId(fine.getBorrowRecord().getId());
                	modelMapper.map(fine, response);
                	return response;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<FineResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }
}
