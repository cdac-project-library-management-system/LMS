package com.lms.dto.request;

import java.math.BigDecimal;

import com.lms.entities.enums.FineStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FineRequestDTO {
	
	private Long borrowRecordId;
    
    private int daysOverdue;
    
    private BigDecimal fineAmount;
    
    private FineStatus status;
}
