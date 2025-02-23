package com.lms.service.impl;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.FineRequestDTO;
import com.lms.dto.response.FineResponseDTO;
import com.lms.entities.BorrowRecord;
import com.lms.entities.Fine;
import com.lms.repository.BorrowRecordRepository;
import com.lms.repository.FineRepository;
import com.lms.service.FineService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineRepository fineRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final ModelMapper modelMapper;
    
    // Define per-day rates for dynamic fine calculation
    private static final BigDecimal RATE_FIRST_30_DAYS = new BigDecimal("5.00");
    private static final BigDecimal RATE_AFTER_30_DAYS = new BigDecimal("2.00");

    /**
     * Calculates the fine dynamically.
     * For the first 30 days, each day is fined at RATE_FIRST_30_DAYS.
     * For any day beyond 30, each day is fined at RATE_AFTER_30_DAYS.
     */
    private BigDecimal calculateFine(long daysOverdue) {
        if (daysOverdue <= 30) {
            return RATE_FIRST_30_DAYS.multiply(BigDecimal.valueOf(daysOverdue));
        } else {
            BigDecimal first30 = RATE_FIRST_30_DAYS.multiply(BigDecimal.valueOf(30));
            BigDecimal additional = RATE_AFTER_30_DAYS.multiply(BigDecimal.valueOf(daysOverdue - 30));
            return first30.add(additional);
        }
    }

    @Override
    public FineResponseDTO createFine(FineRequestDTO dto) {
        Fine fine = new Fine();
        BorrowRecord borrowRecord = borrowRecordRepository.findById(dto.getBorrowRecordId())
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));
        fine.setBorrowRecord(borrowRecord);

        // Calculate overdue days if the book has been returned after the due date.
        if (borrowRecord.getReturnDate() != null && borrowRecord.getReturnDate().isAfter(borrowRecord.getDueDate())) {
            long daysOverdue = ChronoUnit.DAYS.between(borrowRecord.getDueDate(), borrowRecord.getReturnDate());
            fine.setDaysOverdue((int) daysOverdue);
            fine.setFineAmount(calculateFine(daysOverdue));
        } else {
            fine.setDaysOverdue(0);
            fine.setFineAmount(BigDecimal.ZERO);
        }
        
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
        
        // Recalculate fine based on the current state of the associated borrow record.
        BorrowRecord borrowRecord = fine.getBorrowRecord();
        if (borrowRecord.getReturnDate() != null && borrowRecord.getReturnDate().isAfter(borrowRecord.getDueDate())) {
            long daysOverdue = ChronoUnit.DAYS.between(borrowRecord.getDueDate(), borrowRecord.getReturnDate());
            fine.setDaysOverdue((int) daysOverdue);
            fine.setFineAmount(calculateFine(daysOverdue));
        } else {
            fine.setDaysOverdue(0);
            fine.setFineAmount(BigDecimal.ZERO);
        }
        
        fine = fineRepository.save(fine);
        return modelMapper.map(fine, FineResponseDTO.class);
    }

    @Override
    public FineResponseDTO getFineById(Long fineId) {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new RuntimeException("Fine not found"));
        return modelMapper.map(fine, FineResponseDTO.class);
    }

    @Override
    public FineResponseDTO getFineByBorrowRecord(Long borrowRecordId) {
        Fine fine = fineRepository.findByBorrowRecordId(borrowRecordId)
                .orElseThrow(() -> new RuntimeException("Fine not found for this borrow record"));
        return modelMapper.map(fine, FineResponseDTO.class);
    }

    @Override
    public PaginatedResponseDTO<FineResponseDTO> getAllFines(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Fine> pageResult = fineRepository.findAll(pageable);
        List<FineResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(fine -> modelMapper.map(fine, FineResponseDTO.class))
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
