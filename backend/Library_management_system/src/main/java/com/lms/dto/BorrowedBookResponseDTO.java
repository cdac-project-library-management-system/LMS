package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class BorrowedBookResponseDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private String bookTitle;
    private String userFullName;
    private LocalDate borrowedDate;
    private LocalDate dueDate;
    private boolean isReturned;
}
