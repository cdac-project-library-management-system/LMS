package com.lms.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.ErrorResponseDTO;
import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    
    // Create a new book
    @PostMapping
    public ResponseEntity<BookResponseDTO> createBook(@RequestBody BookRequestDTO bookRequestDto) {
        BookResponseDTO response = bookService.createBook(bookRequestDto);
        return ResponseEntity.ok(response);
    }
    
    // Update an existing book
    @PutMapping("/{bookId}")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable Long bookId,
                                                      @RequestBody BookRequestDTO bookRequestDto) {
        BookResponseDTO response = bookService.updateBook(bookId, bookRequestDto);
        return ResponseEntity.ok(response);
    }
    
    // Get a book by ID
    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookById(@PathVariable Long bookId) {
        try {
        	BookResponseDTO response = bookService.getBookById(bookId);
            return ResponseEntity.ok(response);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errorResponse = new ErrorResponseDTO(
        			"Book not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    
    // Get paginated list of books
    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<BookResponseDTO>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PaginatedResponseDTO<BookResponseDTO> response = bookService.getAllBooks(page, size);
        return ResponseEntity.ok(response);
    }
    
    // Delete a book (permanent deletion in this example)
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }
}
