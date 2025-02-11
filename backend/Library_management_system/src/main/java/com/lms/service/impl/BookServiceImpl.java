package com.lms.service.Impl;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;
import com.lms.entities.Book;
import com.lms.exception.ResourceNotFoundException;
import com.lms.repositories.BookRepository;
import com.lms.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // ✅ Add a new book
    @Override
    public BookResponseDTO addBook(BookRequestDTO bookRequest) {
        Book book = mapToEntity(bookRequest);
        Book savedBook = bookRepository.save(book);
        return mapToDTO(savedBook);
    }

    // ✅ Update an existing book
    @Override
    public BookResponseDTO updateBook(Long id, BookRequestDTO bookRequest) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));

        book.setTitle(bookRequest.getTitle());
        book.setAuthor(bookRequest.getAuthor());
        book.setGenre(bookRequest.getGenre());
        book.setIsbn(bookRequest.getIsbn());
        book.setAvailableCopies(bookRequest.getAvailableCopies());

        Book updatedBook = bookRepository.save(book);
        return mapToDTO(updatedBook);
    }

    // ✅ Delete a book
    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookRepository.delete(book);
    }

    // ✅ Get all books
    @Override
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get a book by ID
    @Override
    public BookResponseDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return mapToDTO(book);
    }

    // ✅ Search books by title
    @Override
    public List<BookResponseDTO> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title)
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Search books by author
    @Override
    public List<BookResponseDTO> searchBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author)
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Search books by genre
    @Override
    public List<BookResponseDTO> searchBooksByGenre(String genre) {
        return bookRepository.findByGenreContainingIgnoreCase(genre)
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get all available books
    @Override
    public List<BookResponseDTO> getAvailableBooks() {
        return bookRepository.findByAvailableCopiesGreaterThan(0)
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get a book by ISBN
    @Override
    public BookResponseDTO getBookByIsbn(String isbn) {
        Book book = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ISBN: " + isbn));
        return mapToDTO(book);
    }

    // 🔹 Helper method to map DTO to Entity
    private Book mapToEntity(BookRequestDTO dto) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setGenre(dto.getGenre());
        book.setIsbn(dto.getIsbn());
        book.setAvailableCopies(dto.getAvailableCopies());
        return book;
    }

    // 🔹 Helper method to map Entity to DTO
    private BookResponseDTO mapToDTO(Book book) {
        BookResponseDTO dto = new BookResponseDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre());
        dto.setIsbn(book.getIsbn());
        dto.setAvailableCopies(book.getAvailableCopies());
        return dto;
    }
}
