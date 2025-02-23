package com.lms.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.ErrorResponseDTO;
import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.ReviewRequestDTO;
import com.lms.dto.response.ReviewResponseDTO;
import com.lms.exceptions.ApiException;
import com.lms.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    
    // Create a new review
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewRequestDTO dto) {
        try {
            ReviewResponseDTO response = reviewService.createReview(dto);
            response.setUserId(dto.getUserId());
            response.setBookId(dto.getBookId());
            return ResponseEntity.ok(response);
            
        } catch (ApiException ex) {
            ErrorResponseDTO error = new ErrorResponseDTO(ex.getMessage(), null);
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            
        } catch (Exception ex) {
            ex.printStackTrace();
            ErrorResponseDTO error = new ErrorResponseDTO("An unexpected error occurred", null);
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    public ResponseEntity<?> getReviewById(@PathVariable Long reviewId) {
    	try {
    		ReviewResponseDTO reviewResponse = reviewService.getReviewById(reviewId);
    		return ResponseEntity.ok(reviewResponse);
    	} catch(ApiException ex) {
    		ErrorResponseDTO errorResponse = new ErrorResponseDTO(
    				"Review not found",
    				Collections.singletonList(ex.getMessage())
    		);
    		return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    	}
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
