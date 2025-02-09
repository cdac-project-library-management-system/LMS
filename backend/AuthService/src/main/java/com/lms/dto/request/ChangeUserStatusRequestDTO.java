package com.lms.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeUserStatusRequestDTO {

    private Long userId;
    private boolean isActive;  // true = active, false = inactive

}
