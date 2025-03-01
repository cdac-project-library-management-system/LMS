package com.lms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDTO {
    private String title;
    private String isbn;
    private String description;
    private String author;
    private Integer copiesAvailable;
    private String coverImageUrl;
    private Long categoryId;
}
