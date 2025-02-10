package com.lms.review.controller;

import com.lms.review.dto.ReviewDTO;
import com.lms.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getReviewsByBookId(null); // Adjusted to use DTO
    }

    @PostMapping
    public ReviewDTO submitReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.submitReview(reviewDTO);
    }
}
