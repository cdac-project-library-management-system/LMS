package com.lms.dto.request;

import java.time.LocalDateTime;

import com.lms.entities.enums.BorrowStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordRequestDTO {
    private Long userId;
    private Long bookId;
    private LocalDateTime borrowDate;
    private LocalDateTime dueDate;
    // Set the initial status (BORROWED)
    private BorrowStatus status;
}