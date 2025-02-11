package com.lms.controller;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.response.BookResponseDTO;
import com.lms.entities.Book;
import com.lms.service.BookService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Book Management", description = "Endpoints for managing books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // ✅ Add a new book
    @PostMapping
    public ResponseEntity<BookResponseDTO> addBook(@Valid @RequestBody BookRequestDTO bookRequestDTO) {
        BookResponseDTO bookResponse = bookService.addBook(bookRequestDTO);
        return new ResponseEntity<>(bookResponse, HttpStatus.CREATED);
    }

    // ✅ Update an existing book
    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(
            @PathVariable Long id, 
            @Valid @RequestBody BookRequestDTO bookRequestDTO) {
        return ResponseEntity.ok(bookService.updateBook(id, bookRequestDTO));
    }

    // ✅ Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get all books
    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // ✅ Get a book by ID
    @Operation(summary = "Get book by ID", description = "Fetch a book using its ID")
    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable Long id) {
        BookResponseDTO bookResponse = bookService.getBookById(id);
        return ResponseEntity.ok(bookResponse);
    }

    // ✅ Search books by title
    @Operation(summary = "Search books by title")
    @GetMapping("/search/title/{title}")
    public ResponseEntity<List<BookResponseDTO>> searchBooksByTitle(@PathVariable String title) {
        List<BookResponseDTO> books = bookService.searchBooksByTitle(title);
        return ResponseEntity.ok(books);
    }

    // ✅ Search books by author
    @GetMapping("/search/author/{author}")
    public ResponseEntity<List<BookResponseDTO>> searchBooksByAuthor(@PathVariable String author) {
        List<BookResponseDTO> books = bookService.searchBooksByAuthor(author);
        return ResponseEntity.ok(books);
    }

    // ✅ Search books by genre
    @GetMapping("/search/genre/{genre}")
    public ResponseEntity<List<BookResponseDTO>> searchBooksByGenre(@PathVariable String genre) {
        List<BookResponseDTO> books = bookService.searchBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }

    // ✅ Get all available books
    @GetMapping("/available")
    public ResponseEntity<List<BookResponseDTO>> getAvailableBooks() {
        List<BookResponseDTO> books = bookService.getAvailableBooks();
        return ResponseEntity.ok(books);
    }

    // ✅ Get book by ISBN
    @Operation(summary = "Get book by ISBN")
    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<BookResponseDTO> getBookByIsbn(@PathVariable String isbn) {
        BookResponseDTO bookResponse = bookService.getBookByIsbn(isbn);
        return ResponseEntity.ok(bookResponse);
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

