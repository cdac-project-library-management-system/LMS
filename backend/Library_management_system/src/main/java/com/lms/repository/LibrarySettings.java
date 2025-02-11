package com.lms.repositories;

import com.lms.entities.LibrarySettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibrarySettings extends JpaRepository<LibrarySettings, Long> {
}
