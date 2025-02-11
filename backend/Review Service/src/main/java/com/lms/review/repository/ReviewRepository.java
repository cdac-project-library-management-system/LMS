package com.lms.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.review.entity.Review;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBookId(Long bookId);
}
