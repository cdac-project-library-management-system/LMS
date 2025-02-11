package com.lms.repositories;

import com.lms.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);  // 🔹 Find user by email

    List<User> findByRole(String role);  // 🔹 Get all users by role (e.g., "ADMIN", "MEMBER")

    boolean existsByEmail(String email);  // 🔹 Check if email already exists

}
