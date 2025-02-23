package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	Optional<Category> findByName(String name);

}
