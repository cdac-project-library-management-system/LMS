package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserStatusResponseDTO {

    private Long userId;
    private boolean isActive;  // Updated status of the user
    private String message;

    public ChangeUserStatusResponseDTO(String message) {
        this.message = message;
    }

}
