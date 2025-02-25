package com.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.ReviewRequestDTO;
import com.lms.dto.response.ReviewResponseDTO;
import com.lms.entities.Review;
import com.lms.exceptions.ApiException;
import com.lms.repository.BookRepository;
import com.lms.repository.ReviewRepository;
import com.lms.repository.UserRepository;
import com.lms.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Override
    public ReviewResponseDTO createReview(ReviewRequestDTO dto) {
        Review review = modelMapper.map(dto, Review.class);

        review.setUser(userRepository.findByIdAndStatusTrue(dto.getUserId())
                .orElseThrow(() -> new ApiException("User not found")));

        review.setBook(bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ApiException("Book not found")));
        
        review = reviewRepository.save(review);
        return modelMapper.map(review, ReviewResponseDTO.class);
    }

    @Override
    public ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO dto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        if (dto.getRating() != null) review.setRating(dto.getRating());
        if (dto.getComment() != null) review.setComment(dto.getComment());
        if (dto.getReviewDate() != null) review.setReviewDate(dto.getReviewDate());
        review = reviewRepository.save(review);
        ReviewResponseDTO response = new ReviewResponseDTO();
        response.setUserId(review.getUser().getId());
        response.setBookId(review.getBook().getId());
        modelMapper.map(review, response);
        return response;
    }

    @Override
    public ReviewResponseDTO getReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException("Review not found"));
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setUserId(review.getUser().getId());
        dto.setBookId(review.getBook().getId());
        modelMapper.map(review, dto);
        return dto;
    }

    @Override
    public PaginatedResponseDTO<ReviewResponseDTO> getReviewsByBook(Long bookId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Review> pageResult = reviewRepository.findByBookId(bookId, pageable);
        List<ReviewResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(review -> {
                    ReviewResponseDTO dto = modelMapper.map(review, ReviewResponseDTO.class);
                    dto.setUserId(review.getUser().getId());
                    dto.setBookId(bookId);
                    return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<ReviewResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

    @Override
    public PaginatedResponseDTO<ReviewResponseDTO> getReviewsByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Review> pageResult = reviewRepository.findByUserId(userId, pageable);
        List<ReviewResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(review -> {
                    ReviewResponseDTO dto = modelMapper.map(review, ReviewResponseDTO.class);
                    dto.setUserId(userId);
                    dto.setBookId(review.getBook().getId());
                    return dto;
                })
                .collect(Collectors.toList());
        PaginatedResponseDTO<ReviewResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }
    
}
