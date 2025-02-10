package com.lms.review.dto;

import com.lms.review.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDTO {
    private Long id;
    private Long bookId;
    private Long userId;
    private String comment;
    private int rating;
    private LocalDateTime submittedAt;

    public ReviewDTO() {}

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.bookId = review.getBookId();
        this.userId = review.getUserId();
        this.comment = review.getComment();
        this.rating = review.getRating();
        this.submittedAt = review.getSubmittedAt();
    }
}
