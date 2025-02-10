package com.lms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.MemberDTO;
import com.lms.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/members")
@Tag(name = "Member Controller", description = "APIs for managing library members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(summary = "Create a new member", description = "Registers a new member in the library system.")
    @PostMapping
    public ResponseEntity<MemberDTO> createMember(@RequestBody MemberDTO memberDTO) {
        MemberDTO createdMember = memberService.createMember(memberDTO);
        return ResponseEntity.ok(createdMember);
    }

    @Operation(summary = "Get member by ID", description = "Fetches the details of a specific member.")
    @GetMapping("/{id}")
    public ResponseEntity<MemberDTO> getMemberById(
            @Parameter(description = "ID of the member to retrieve") @PathVariable Long id) {
        MemberDTO member = memberService.getMemberById(id);
        return ResponseEntity.ok(member);
    }

    /**
     * Retrieves all members.
     *
     * @return A list of all members.
     */
    @Operation(summary = "Get all members", description = "Fetches a list of all registered members.")
    @GetMapping
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> members = memberService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @Operation(summary = "Update member details", description = "Updates the information of an existing member.")
    @PutMapping("/{id}")
    public ResponseEntity<MemberDTO> updateMember(
            @Parameter(description = "ID of the member to update") @PathVariable Long id, 
            @RequestBody MemberDTO memberDTO) {
        MemberDTO updatedMember = memberService.updateMember(id, memberDTO);
        return ResponseEntity.ok(updatedMember);
    }

    @Operation(summary = "Delete member", description = "Removes a member from the library system.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(
            @Parameter(description = "ID of the member to delete") @PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
