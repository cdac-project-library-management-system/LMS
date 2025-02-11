package com.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.entities.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // Find a member by email
//    Optional<Member> findByEmail(String email);

    // Get all members (users with MEMBER role)
    List<Member> findAll();
}
