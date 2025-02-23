package com.lms.dto.request;

import java.time.LocalDateTime;

import com.lms.entities.enums.ReservationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDTO {
    private Long userId;
    private Long bookId;
    private LocalDateTime reservationDate;
    private ReservationStatus status;
}