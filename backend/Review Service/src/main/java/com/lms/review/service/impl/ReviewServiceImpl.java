package com.lms.review.service.impl;

import com.lms.review.dto.ReviewDTO;
import com.lms.review.entity.Review;
import com.lms.review.repository.ReviewRepository;
import com.lms.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public ReviewDTO submitReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setBookId(reviewDTO.getBookId());
        review.setUserId(reviewDTO.getUserId());
        review.setComment(reviewDTO.getComment());
        review.setRating(reviewDTO.getRating());

        review = reviewRepository.save(review);

        return convertToDTO(review);
    }

    @Override
    public List<ReviewDTO> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setBookId(review.getBookId());
        dto.setUserId(review.getUserId());
        dto.setComment(review.getComment());
        dto.setRating(review.getRating());
        dto.setSubmittedAt(review.getSubmittedAt());
        return dto;
    }
}
