package com.lms.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.Reservation;
import com.lms.entities.enums.ReservationStatus;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	

    Page<Reservation> findByUserId(Long userId, Pageable pageable);
	
	List<Reservation> findByStatus(ReservationStatus status);

}
