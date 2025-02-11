package com.lms.repositories;
import com.lms.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    // ✅ Find books by title (case insensitive)
    List<Book> findByTitleContainingIgnoreCase(String title);

    // ✅ Find books by author name (case insensitive)
    List<Book> findByAuthorContainingIgnoreCase(String author);

    // ✅ Find books by genre (case insensitive)
    List<Book> findByGenreContainingIgnoreCase(String genre);

    // ✅ Find books by availability
    List<Book> findByAvailableCopiesGreaterThan(int minCopies);

    // ✅ Get books by ISBN (exact match)
    Optional<Book> findByIsbn(String isbn);

    // ✅ Custom Query: Fetch books with a minimum stock count
    @Query("SELECT b FROM Book b WHERE b.availableCopies >= :minStock")
    List<Book> findBooksByMinStock(@Param("minStock") int minStock);

    // ✅ Custom Query: Search books by multiple fields
    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchBooksByKeyword(@Param("keyword") String keyword);
}
