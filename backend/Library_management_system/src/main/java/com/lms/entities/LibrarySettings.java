package com.lms.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "library_settings")
public class LibrarySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int maxBooksPerUser;  // 🔹 Maximum books a user can borrow

    private int loanDurationDays; // 🔹 Default loan period in days

    private double finePerDay;    // 🔹 Fine amount per overdue day

    private String libraryName;   // 🔹 Library name

    private String contactEmail;  // 🔹 Contact email for library admin

}
