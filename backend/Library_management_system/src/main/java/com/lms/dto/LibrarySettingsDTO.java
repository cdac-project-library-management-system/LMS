package com.lms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LibrarySettingsDTO {
    private int maxBooksPerUser;
    private int borrowingDurationDays;
    private double finePerDay;
    private String libraryOpeningHours;
}
