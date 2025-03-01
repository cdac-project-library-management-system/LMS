package com.lms.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.lms.entities.enums.FineStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FineResponseDTO {
	
    private Long id;
    
    private Long borrowRecordId;
    
    private int daysOverdue;
    
    private BigDecimal fineAmount;
    
    private FineStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
