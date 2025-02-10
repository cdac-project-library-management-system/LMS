package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private Long id;
    private Long memberId;
    private Long bookId;
    private String comment;
    private int rating; // 1 to 5 stars
}

