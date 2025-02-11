package com.lms.service;

import java.util.List;

import com.lms.dto.MemberDTO;

public interface MemberService {
	
    MemberDTO createMember(MemberDTO memberDTO);
    
    MemberDTO getMemberById(Long id);
    
    List<MemberDTO> getAllMembers();
    
    MemberDTO updateMember(Long id, MemberDTO memberDTO);
    
    void deleteMember(Long id);

}
