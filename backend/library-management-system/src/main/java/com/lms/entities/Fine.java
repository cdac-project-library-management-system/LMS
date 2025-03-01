package com.lms.entities;

import java.math.BigDecimal;

import com.lms.entities.enums.FineStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "fines")
public class Fine extends BaseEntity {
	
	@OneToOne
    @JoinColumn(name = "borrow_record_id", nullable = false)
    private BorrowRecord borrowRecord;
	
	@Column(nullable = false)
    private int daysOverdue;
	
	@Column(nullable = false)
    private BigDecimal fineAmount;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FineStatus status;

}
