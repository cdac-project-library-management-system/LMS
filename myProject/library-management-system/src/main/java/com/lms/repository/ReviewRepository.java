package com.lms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	Page<Review> findByBookId(Long bookId, Pageable pageable);
	
	Page<Review> findByUserId(Long userId, Pageable pageable);

}
