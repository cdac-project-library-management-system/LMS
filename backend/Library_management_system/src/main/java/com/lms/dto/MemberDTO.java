package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
    private Long id;
    private String name;
    private String email;
    private Long userId;
}

