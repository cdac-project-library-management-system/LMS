package com.lms.service.Impl;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.request.LibrarySettingsDTO;
import com.lms.dto.response.*;
import com.lms.exception.ResourceNotFoundException;
import com.lms.entities.*;
import com.lms.entities.LibrarySettings;
import com.lms.repositories.*;

import com.lms.service.AdminService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BorrowingRepository borrowingRepository;
    private final FineRepository fineRepository;
    private final LibrarySettingsRepository settingsRepository;

    public AdminServiceImpl(BookRepository bookRepository, UserRepository userRepository, 
                            BorrowingRepository borrowingRepository, FineRepository fineRepository, 
                            LibrarySettingsRepository settingsRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.borrowingRepository = borrowingRepository;
        this.fineRepository = fineRepository;
        this.settingsRepository = settingsRepository;
    }

    // ✅ Book Management
    @Override
    public BookResponseDTO addBook(BookRequestDTO bookRequestDTO) {
        Book book = new Book(bookRequestDTO.getTitle(), bookRequestDTO.getAuthor(), 
                             bookRequestDTO.getGenre(), bookRequestDTO.getIsbn(), 
                             bookRequestDTO.getAvailableCopies(), bookRequestDTO.getTotalCopies());
        bookRepository.save(book);
        return new BookResponseDTO(book);
    }

    @Override
    public BookResponseDTO updateBook(Long id, BookRequestDTO bookRequestDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        book.setTitle(bookRequestDTO.getTitle());
        book.setAuthor(bookRequestDTO.getAuthor());
        book.setGenre(bookRequestDTO.getGenre());
        book.setIsbn(bookRequestDTO.getIsbn());
        book.setAvailableCopies(bookRequestDTO.getAvailableCopies());
        bookRepository.save(book);
        return new BookResponseDTO(book);
    }

    @Override
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    // ✅ User Management
    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void updateUserRole(Long id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setRole(role);
        userRepository.save(user);
    }

    // ✅ Borrowing Management
    @Override
    public List<BorrowedBookResponseDTO> getAllBorrowedBooks() {
        return borrowingRepository.findAll()
                .stream()
                .map(BorrowedBookResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void approveBorrowRequest(Long id) {
        Borrowing borrowing = borrowingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrowing record not found with id: " + id));
        borrowing.setApproved(true);
        borrowingRepository.save(borrowing);
    }

    // ✅ Fine Management
    @Override
    public List<FineResponseDTO> getAllFines() {
        return fineRepository.findAll()
                .stream()
                .map(FineResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void updateFineStatus(Long id) {
        Fine fine = fineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fine record not found with id: " + id));
        fine.setPaid(true);
        fineRepository.save(fine);
    }

    // ✅ Reports & Dashboard
    @Override
    public DashboardStatsDTO getDashboardStats() {
        long totalBooks = bookRepository.count();
        long totalUsers = userRepository.count();
        long totalBorrowedBooks = borrowingRepository.count();
        long totalPendingFines = fineRepository.countUnpaidFines();

        return new DashboardStatsDTO(totalBooks, totalUsers, totalBorrowedBooks, totalPendingFines);
    }

    // ✅ System Configuration
    @Override
    public void updateLibrarySettings(LibrarySettingsDTO settingsDTO) {
        LibrarySettings settings = settingsRepository.findById(1L)
                .orElse(new LibrarySettings());

        settings.setMaxBorrowLimit(settingsDTO.getMaxBorrowLimit());
        settings.setFinePerDay(settingsDTO.getFinePerDay());
        settingsRepository.save(settings);
    }
}
