package com.lms.utils;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class FineCalculator {

    private static final BigDecimal RATE_FIRST_30_DAYS = new BigDecimal("5.00");
    private static final BigDecimal RATE_AFTER_30_DAYS = new BigDecimal("2.00");

    public static BigDecimal calculateFine(LocalDateTime dueDate, LocalDateTime returnDate) {
        if (returnDate == null || !returnDate.isAfter(dueDate)) {
            return BigDecimal.ZERO;
        }

        long daysOverdue = ChronoUnit.DAYS.between(dueDate, returnDate);
        
        if (daysOverdue <= 30) {
            return RATE_FIRST_30_DAYS.multiply(BigDecimal.valueOf(daysOverdue));
        } else {
            BigDecimal first30 = RATE_FIRST_30_DAYS.multiply(BigDecimal.valueOf(30));
            BigDecimal additional = RATE_AFTER_30_DAYS.multiply(BigDecimal.valueOf(daysOverdue - 30));
            return first30.add(additional);
        }
    }
}

