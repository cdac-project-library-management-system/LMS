package com.lms.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDTO {
    private Long userId;
    private Long bookId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
}
