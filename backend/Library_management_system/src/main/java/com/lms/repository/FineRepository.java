package com.lms.repositories;

import com.lms.entities.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FineRepository extends JpaRepository<Fine, Long> {
    
    @Query("SELECT COUNT(f) FROM Fine f WHERE f.isPaid = false")
    long countUnpaidFines();
}
