package com.lms.dto.response;

import java.time.LocalDateTime;

import com.lms.entities.enums.BorrowStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordResponseDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private BorrowStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
