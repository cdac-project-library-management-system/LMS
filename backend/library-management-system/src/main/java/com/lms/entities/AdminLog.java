package com.lms.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin; // The admin who performed the action

    @Column(nullable = false)
    private String action; // e.g., "ADD", "DELETE", "UPDATE"

    @Column(nullable = false)
    private String entityType; // e.g., "Book", "User"

    @Column(nullable = false)
    private Long entityId; // ID of the entity (e.g., bookId, userId)

    @Column(nullable = false)
    private LocalDateTime timestamp; // Timestamp of the action

    // Constructors for convenience
    public AdminLog(User admin, String action, String entityType, Long entityId, LocalDateTime timestamp) {
        this.admin = admin;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.timestamp = timestamp;
    }
}