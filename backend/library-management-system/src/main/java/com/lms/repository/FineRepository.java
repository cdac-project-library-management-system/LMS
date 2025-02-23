package com.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.Fine;
import com.lms.entities.enums.FineStatus;

public interface FineRepository extends JpaRepository<Fine, Long> {
	
	Optional<Fine> findByBorrowRecordId(Long borrowRecordId);
	
	List<Fine> findByStatus(FineStatus status);

}
