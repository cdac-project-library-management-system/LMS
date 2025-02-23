package com.lms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.AdminLog;

public interface AdminLogRepository extends JpaRepository<AdminLog, Long> {
	
	Page<AdminLog> findByAdminId(Long adminId, Pageable pageable);
	
	Page<AdminLog> findAll(Pageable pageable);


}
