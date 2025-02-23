package com.lms.entities;

import com.lms.entities.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {
	
	@Column(nullable = false, unique = true)
    private String email;
	
	@Column(nullable = false)
    private String password;
	
	@Column(name = "name", nullable = false)
    private String fullName;
	
	@Column(name = "phone_no")
	private String phoneNumber;
	
	@Lob
	private String address;
	
	@Column(name = "pfp")
	private String profilePicUrl;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
	
	@Column
	private boolean status;

}
