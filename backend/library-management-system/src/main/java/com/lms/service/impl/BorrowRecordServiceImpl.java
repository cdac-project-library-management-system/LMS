package com.lms.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
import com.lms.dto.request.BorrowRecordRequestDTO;
import com.lms.dto.request.FineRequestDTO;
import com.lms.dto.response.BorrowRecordResponseDTO;
import com.lms.entities.BorrowRecord;
import com.lms.entities.enums.BorrowStatus;
import com.lms.entities.enums.FineStatus;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.BookRepository;
import com.lms.repository.BorrowRecordRepository;
import com.lms.repository.UserRepository;
import com.lms.service.BorrowRecordService;
import com.lms.service.FineService;
import com.lms.utils.FineCalculator;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BorrowRecordServiceImpl implements BorrowRecordService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final FineService fineService;
    private final ModelMapper modelMapper;

    @Override
    public BorrowRecordResponseDTO createBorrowRecord(BorrowRecordRequestDTO dto) {
        // Map request DTO to entity
        BorrowRecord record = modelMapper.map(dto, BorrowRecord.class);

        // Retrieve and set the user
        record.setUser(userRepository.findByIdAndStatusTrue(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        // Retrieve and set the book
        record.setBook(bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found")));

        // Set the borrow date (if not provided, default to the current date/time)
        if (dto.getBorrowDate() == null) {
            record.setBorrowDate(LocalDateTime.now());
        }

        // Automatically calculate the due date as 15 days after the borrow date
        record.setDueDate(record.getBorrowDate().plusDays(15));

        // Save the record in the database
        record = borrowRecordRepository.save(record);

        // Map the saved record to the response DTO
        BorrowRecordResponseDTO response = new BorrowRecordResponseDTO();
        response.setUserId(record.getUser().getId());
        response.setBookId(record.getBook().getId());
        modelMapper.map(record, response);

        return response;
    }

    @Override
    public BorrowRecordResponseDTO updateBorrowRecord(Long recordId, BorrowRecordRequestDTO dto) {
        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found"));

        if (dto.getBorrowDate() != null) {
            record.setBorrowDate(dto.getBorrowDate());
        }
        if (dto.getDueDate() != null) {
            record.setDueDate(dto.getDueDate());
        }
        if (dto.getStatus() != null) {
            record.setStatus(dto.getStatus());

            // Set the return date if the status is updated to RETURNED
            if (dto.getStatus() == BorrowStatus.RETURNED) {
                record.setReturnDate(LocalDateTime.now());

                // Check if the book was returned late
                if (record.getReturnDate().isAfter(record.getDueDate())) {
                    long daysOverdue = ChronoUnit.DAYS.between(record.getDueDate(), record.getReturnDate());

                    // Create FineRequestDTO and call FineService
                    FineRequestDTO fineRequest = new FineRequestDTO();
                    fineRequest.setBorrowRecordId(record.getId());
                    fineRequest.setDaysOverdue((int) daysOverdue);
                    BigDecimal fineAmount = FineCalculator.calculateFine(record.getDueDate(), record.getReturnDate());
                    fineRequest.setFineAmount(fineAmount);
                    fineRequest.setStatus(FineStatus.UNPAID); // Default status for new fines
                    
                    // Call FineService to create the fine
                    fineService.createFine(fineRequest);
                }
            }
        }

        record = borrowRecordRepository.save(record);
        BorrowRecordResponseDTO response = new BorrowRecordResponseDTO();
        modelMapper.map(record, response);
        response.setUserId(record.getUser().getId());
        response.setBookId(record.getBook().getId());

        return response;
    }


    @Override
    public BorrowRecordResponseDTO getBorrowRecordById(Long recordId) {
        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));
        BorrowRecordResponseDTO dto = new BorrowRecordResponseDTO();
        dto.setBookId(record.getBook().getId());
        dto.setUserId(record.getUser().getId());
        modelMapper.map(record, dto);
        return dto;
    }

    @Override
    public PaginatedResponseDTO<BorrowRecordResponseDTO> getBorrowRecordsByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BorrowRecord> pageResult = borrowRecordRepository.findByUserId(userId, pageable);
        List<BorrowRecordResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(record -> {
                	BorrowRecordResponseDTO dto = new BorrowRecordResponseDTO();
                	dto.setBookId(record.getBook().getId());
                	dto.setUserId(record.getUser().getId());
                	modelMapper.map(record, dto);
                	return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<BorrowRecordResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

    @Override
    public PaginatedResponseDTO<BorrowRecordResponseDTO> getAllBorrowRecords(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BorrowRecord> pageResult = borrowRecordRepository.findAll(pageable);
        List<BorrowRecordResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(record -> {
                	BorrowRecordResponseDTO dto = new BorrowRecordResponseDTO();
                	dto.setReturnDate(record.getReturnDate());
                	dto.setBookId(record.getBook().getId());
                	dto.setUserId(record.getUser().getId());
                	modelMapper.map(record, dto);
                	return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<BorrowRecordResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

}
