package com.lms.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
@Table(name = "reviews")
public class Review extends BaseEntity {
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
	
	@Column(nullable = false)
    private Integer rating;
	
	@Lob
    private String comment;
	
	@Column(nullable = false)
    private LocalDateTime reviewDate;

}
