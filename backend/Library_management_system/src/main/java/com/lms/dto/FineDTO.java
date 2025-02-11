package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FineDTO {
    private Long id;
    private Long memberId;
    private BigDecimal amount;
    private boolean isPaid;
}

