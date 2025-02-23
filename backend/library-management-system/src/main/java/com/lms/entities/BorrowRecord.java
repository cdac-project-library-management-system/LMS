package com.lms.entities;

import java.time.LocalDateTime;

import com.lms.entities.enums.BorrowStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "borrow_records")
public class BorrowRecord extends BaseEntity {
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
	
	@Column(name = "borrow_date", nullable = false)
    private LocalDateTime borrowDate;
	
	@Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;
	
	@Column(name = "return_date")
	private LocalDateTime returnDate;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BorrowStatus status;

}
