package com.lms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequestDTO {
	private Long id;
	private String title;
    private String author;
    private String genre;
    private String isbn;
    private int availableCopies;
    private int totalCopies;
}
