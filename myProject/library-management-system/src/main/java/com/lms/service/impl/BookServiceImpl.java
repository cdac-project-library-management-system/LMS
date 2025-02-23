package com.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.dto.PaginatedResponseDTO;
import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;
import com.lms.entities.Book;
import com.lms.entities.Category;
import com.lms.repository.BookRepository;
import com.lms.repository.CategoryRepository;
import com.lms.service.BookService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    
    @Override
    public BookResponseDTO createBook(BookRequestDTO dto) {
        // Map request DTO to entity
        Book book = modelMapper.map(dto, Book.class);
        // Retrieve category by ID and set it
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        book.setCategory(category);
        book = bookRepository.save(book);
        return modelMapper.map(book, BookResponseDTO.class);
    }

    @Override
    public BookResponseDTO updateBook(Long bookId, BookRequestDTO dto) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        // Update fields manually or via ModelMapper (here we update manually)
        book.setTitle(dto.getTitle());
        book.setIsbn(dto.getIsbn());
        book.setDescription(dto.getDescription());
        book.setCopiesAvailable(dto.getCopiesAvailable());
        book.setCoverImageUrl(dto.getCoverImageUrl());
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        book.setCategory(category);
        book = bookRepository.save(book);
        return modelMapper.map(book, BookResponseDTO.class);
    }

    @Override
    public BookResponseDTO getBookById(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return modelMapper.map(book, BookResponseDTO.class);
    }

    @Override
    public PaginatedResponseDTO<BookResponseDTO> getAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> pageResult = bookRepository.findAll(pageable);
        List<BookResponseDTO> dtos = pageResult.getContent()
                .stream()
                .map(book -> modelMapper.map(book, BookResponseDTO.class))
                .collect(Collectors.toList());
        PaginatedResponseDTO<BookResponseDTO> response = new PaginatedResponseDTO<>();
        response.setItems(dtos);
        response.setCurrentPage(pageResult.getNumber());
        response.setPageSize(pageResult.getSize());
        response.setTotalItems(pageResult.getTotalElements());
        response.setTotalPages(pageResult.getTotalPages());
        return response;
    }

    @Override
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }
    
}
