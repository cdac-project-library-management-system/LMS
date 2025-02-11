package com.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.lms.dto.MemberDTO;
import com.lms.entities.Member;
import com.lms.entities.User;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.repository.MemberRepository;
import com.lms.repository.UserRepository;
import com.lms.service.MemberService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public MemberServiceImpl(MemberRepository memberRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public MemberDTO createMember(MemberDTO memberDTO) {
        User user = userRepository.findById(memberDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + memberDTO.getId()));

        Member member = new Member();
        member.setUser(user);
        member.setName(memberDTO.getName());
        member.setTotalUnpaidFines(0.0);

        member = memberRepository.save(member);
        return modelMapper.map(member, MemberDTO.class);
    }

    @Override
    public MemberDTO getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));
        return modelMapper.map(member, MemberDTO.class);
    }

    @Override
    public List<MemberDTO> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream()
                .map(member -> modelMapper.map(member, MemberDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public MemberDTO updateMember(Long id, MemberDTO memberDTO) {
        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        existingMember.setName(memberDTO.getName());
        existingMember = memberRepository.save(existingMember);

        return modelMapper.map(existingMember, MemberDTO.class);
    }

    @Override
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        memberRepository.delete(member);
    }
}
