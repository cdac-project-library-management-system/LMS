package com.lms.review.service;

import com.lms.review.dto.ReviewDTO;
import java.util.List;

public interface ReviewService {
    ReviewDTO submitReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getReviewsByBookId(Long bookId);
}
