package com.lms.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLogResponseDTO {

    private Long id;
    private Long adminId;
    private String action;
    private String entityType;
    private Long entityId;
    private LocalDateTime timestamp;

}