package com.lms.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardStatsDTO {
    private long totalBooks;
    private long totalUsers;
    private long totalBorrowedBooks;
    private long totalPendingRequests;
    private long totalFines;
}
