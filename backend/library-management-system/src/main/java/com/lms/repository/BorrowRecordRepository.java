package com.lms.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.BorrowRecord;
import com.lms.entities.enums.BorrowStatus;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
	
	Page<BorrowRecord> findByUserId(Long userId, Pageable pageable);
	
	List<BorrowRecord> findByStatus(BorrowStatus status);

}
