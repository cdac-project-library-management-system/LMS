package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	
	Optional<Book> findByIsbn(String isbn);

}
