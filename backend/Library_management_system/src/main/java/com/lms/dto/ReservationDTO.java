package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDTO {
    private Long id;
    private Long memberId;
    private Long bookId;
    private String status; // PENDING, APPROVED, CANCELLED
}

