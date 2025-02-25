package com.lms.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLogRequestDTO {

    private Long adminId;
    private String action;
    private String entityType;
    private Long entityId;
    private LocalDateTime timestamp;

}