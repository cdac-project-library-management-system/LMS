package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.ReviewRequestDTO;
import com.lms.dto.response.ReviewResponseDTO;
import com.lms.service.ReviewService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    
    // Create a new review
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody ReviewRequestDTO dto) {
        ReviewResponseDTO response = reviewService.createReview(dto);
        return ResponseEntity.ok(response);
    }
    
    // Update an existing review
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> updateReview(@PathVariable Long reviewId,
                                                          @RequestBody ReviewRequestDTO dto) {
        ReviewResponseDTO response = reviewService.updateReview(reviewId, dto);
        return ResponseEntity.ok(response);
    }
    
    // Get a review by its ID
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable Long reviewId) {
        ReviewResponseDTO response = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok(response);
    }
    
    // Get paginated reviews for a specific book
    @GetMapping("/book/{bookId}")
    public ResponseEntity<PaginatedResponseDTO<ReviewResponseDTO>> getReviewsByBook(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<ReviewResponseDTO> response = reviewService.getReviewsByBook(bookId, page, size);
        return ResponseEntity.ok(response);
    }
    
    // Get paginated reviews for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<PaginatedResponseDTO<ReviewResponseDTO>> getReviewsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<ReviewResponseDTO> response = reviewService.getReviewsByUser(userId, page, size);
        return ResponseEntity.ok(response);
    }
    
}
