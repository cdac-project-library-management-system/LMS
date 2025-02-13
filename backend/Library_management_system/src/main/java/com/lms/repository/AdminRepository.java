package com.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
