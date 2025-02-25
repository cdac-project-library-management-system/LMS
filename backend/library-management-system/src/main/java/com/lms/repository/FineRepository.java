package com.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lms.entities.Fine;
import com.lms.entities.enums.FineStatus;

public interface FineRepository extends JpaRepository<Fine, Long> {
	
	Optional<Fine> findByBorrowRecordId(Long borrowRecordId);
	
	List<Fine> findByStatus(FineStatus status);
	
	@Query("SELECT f FROM Fine f WHERE f.borrowRecord.user.id = :userId")
    Page<Fine> findAllFinesByUserId(@Param("userId") Long userId, Pageable pageable);

}
