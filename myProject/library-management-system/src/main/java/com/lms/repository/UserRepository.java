package com.lms.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.lms.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmailAndStatusTrue(String email);
	
	Optional<User> findByIdAndStatusTrue(Long id);
	
	Page<User> findAllByStatusTrue(Pageable pageable);
	
	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.status = false WHERE u.id = :id")
    void softDeleteById(@Param("id") Long id);

}
