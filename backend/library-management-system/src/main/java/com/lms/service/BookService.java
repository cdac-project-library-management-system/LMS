package com.lms.service;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;

public interface BookService {
	
    BookResponseDTO createBook(BookRequestDTO bookRequestDto);
    
    BookResponseDTO updateBook(Long bookId, BookRequestDTO bookRequestDto);
    
    BookResponseDTO getBookById(Long bookId);
    
    PaginatedResponseDTO<BookResponseDTO> getAllBooks(int page, int size);
    
    void deleteBook(Long bookId);

}
