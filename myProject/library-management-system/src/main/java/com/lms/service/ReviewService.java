package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.ReviewRequestDTO;
import com.lms.dto.response.ReviewResponseDTO;

public interface ReviewService {
	   
	ReviewResponseDTO createReview(ReviewRequestDTO dto);
    
	ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO dto);
    
	ReviewResponseDTO getReviewById(Long reviewId);
    
	PaginatedResponseDTO<ReviewResponseDTO> getReviewsByBook(Long bookId, int page, int size);
    
	PaginatedResponseDTO<ReviewResponseDTO> getReviewsByUser(Long userId, int page, int size);

}
