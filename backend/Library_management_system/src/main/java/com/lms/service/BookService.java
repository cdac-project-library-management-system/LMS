package com.lms.service;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;

import java.util.List;

public interface BookService {

    BookResponseDTO addBook(BookRequestDTO bookRequest);
    BookResponseDTO updateBook(Long id, BookRequestDTO bookRequest);
    void deleteBook(Long id);
    List<BookResponseDTO> getAllBooks();
    BookResponseDTO getBookById(Long id);
    List<BookResponseDTO> searchBooksByTitle(String title);
    List<BookResponseDTO> searchBooksByAuthor(String author);
    List<BookResponseDTO> searchBooksByGenre(String genre);
    List<BookResponseDTO> getAvailableBooks();
    BookResponseDTO getBookByIsbn(String isbn);
}

