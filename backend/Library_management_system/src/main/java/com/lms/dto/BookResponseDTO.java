package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDTO {
	private long id;
	private String title;
    private String author;
    private String genre;
    private String isbn;
    private int availableCopies;
    private int totalCopies;
}

