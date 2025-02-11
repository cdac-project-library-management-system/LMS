package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.dto.request.BookRequestDTO;
import com.lms.dto.request.LibrarySettingsDTO;
import com.lms.dto.response.BookResponseDTO;
import com.lms.dto.response.BorrowedBookResponseDTO;
import com.lms.dto.response.DashboardStatsDTO;
import com.lms.dto.response.FineResponseDTO;
import com.lms.dto.response.UserResponseDTO;
import com.lms.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ✅ Book Management
    @PostMapping("/books")
    public ResponseEntity<BookResponseDTO> addBook(@RequestBody BookRequestDTO bookRequestDTO) {
        return ResponseEntity.ok(adminService.addBook(bookRequestDTO));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable Long id, @RequestBody BookRequestDTO bookRequestDTO) {
        return ResponseEntity.ok(adminService.updateBook(id, bookRequestDTO));
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        adminService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    // ✅ User Management
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestParam String role) {
        adminService.updateUserRole(id, role);
        return ResponseEntity.ok("User role updated successfully");
    }

    // ✅ Borrowing Management
    @GetMapping("/borrowed-books")
    public ResponseEntity<List<BorrowedBookResponseDTO>> getAllBorrowedBooks() {
        return ResponseEntity.ok(adminService.getAllBorrowedBooks());
    }

    @PutMapping("/borrowed-books/{id}/approve")
    public ResponseEntity<String> approveBorrowRequest(@PathVariable Long id) {
        adminService.approveBorrowRequest(id);
        return ResponseEntity.ok("Borrow request approved");
    }

    // ✅ Fine Management
    @GetMapping("/fines")
    public ResponseEntity<List<FineResponseDTO>> getAllFines() {
        return ResponseEntity.ok(adminService.getAllFines());
    }

//    @PutMapping("/fines/{id}/pay")
//    public ResponseEntity<String> updateFineStatus(@PathVariable Long id) {
//        adminService.up dateFineStatus(id);
//        return ResponseEntity.ok("Fine status updated");
//    }

    // ✅ Reports & Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // ✅ System Configuration
    @PutMapping("/settings")
    public ResponseEntity<String> updateLibrarySettings(@RequestBody LibrarySettingsDTO settingsDTO) {
        adminService.updateLibrarySettings(settingsDTO);
        return ResponseEntity.ok("Library settings updated");
    }
}
