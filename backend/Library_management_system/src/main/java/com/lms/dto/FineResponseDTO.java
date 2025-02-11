package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class FineResponseDTO {
    private Long id;
    private Long userId;
    private String userFullName;
    private Long bookId;
    private String bookTitle;
    private BigDecimal amount;
    private boolean isPaid;
    private LocalDate dueDate;
}
