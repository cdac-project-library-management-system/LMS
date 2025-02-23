package com.lms.entities;

import java.time.LocalDateTime;

import com.lms.entities.enums.ReservationStatus;

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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservations")
public class Reservation extends BaseEntity {
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
	
	@Column(name = "reservation_date", nullable = false)
    private LocalDateTime reservationDate;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

}
