package com.lms.entities;

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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book extends BaseEntity {
	
	@Column(nullable = false)
    private String title;
	
	@Column(nullable = false, unique = true)
    private String isbn;
	
	@Lob
    private String description;
	
	@Column(nullable = false)
	private String author;
	
	@Column(name = "copies_available", nullable = false)
    private Integer copiesAvailable;
	
	@Column(name = "cover_pic")
	private String coverImageUrl;
	
	@ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
