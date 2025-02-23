package com.lms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLogRequestDTO {
    
    private Long adminId;
    
    private String action;
    
    private String details;
    
}
