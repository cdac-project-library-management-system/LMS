package com.lms.service;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.request.LibrarySettingsDTO;
import com.lms.dto.response.*;
import java.util.List;

public interface AdminService {
    
    // ✅ Book Management
    BookResponseDTO addBook(BookRequestDTO bookRequestDTO);
    BookResponseDTO updateBook(Long id, BookRequestDTO bookRequestDTO);
    void deleteBook(Long id);

    // ✅ User Management
    List<UserResponseDTO> getAllUsers();
    void updateUserRole(Long id, String role);

    // ✅ Borrowing Management
    List<BorrowedBookResponseDTO> getAllBorrowedBooks();
    void approveBorrowRequest(Long id);

    // ✅ Fine Management
    List<FineResponseDTO> getAllFines();
    void updateFineStatus(Long id);

    // ✅ Reports & Dashboard
    DashboardStatsDTO getDashboardStats();

    // ✅ System Configuration
    void updateLibrarySettings(LibrarySettingsDTO settingsDTO);
}
