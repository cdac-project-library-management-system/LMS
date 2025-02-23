package com.lms.service.impl;

import java.time.LocalDateTime;
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
import com.lms.dto.response.BorrowRecordResponseDTO;
import com.lms.entities.BorrowRecord;
import com.lms.entities.enums.BorrowStatus;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.BookRepository;
import com.lms.repository.BorrowRecordRepository;
import com.lms.repository.UserRepository;
import com.lms.service.BorrowRecordService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BorrowRecordServiceImpl implements BorrowRecordService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Override
    public BorrowRecordResponseDTO createBorrowRecord(BorrowRecordRequestDTO dto) {
        BorrowRecord record = modelMapper.map(dto, BorrowRecord.class);
        record.setUser(userRepository.findByIdAndStatusTrue(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        record.setBook(bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found")));
        record = borrowRecordRepository.save(record);
        return modelMapper.map(record, BorrowRecordResponseDTO.class);
    }

    @Override
    public BorrowRecordResponseDTO updateBorrowRecord(Long recordId, BorrowRecordRequestDTO dto) {
        // Fetch the borrow record from the database
        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found"));

        // Update fields if they are provided in the DTO
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
            }
        }

        // Save the updated record in the database
        record = borrowRecordRepository.save(record);
        // Map the updated record to the response DTO
        BorrowRecordResponseDTO response = new BorrowRecordResponseDTO();
        modelMapper.map(record, response);

        // Set additional fields in the response
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
                .map(record -> modelMapper.map(record, BorrowRecordResponseDTO.class))
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
