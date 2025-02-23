package com.lms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "admin_logs")
public class AdminLog extends BaseEntity {
	
	@ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;
	
	@Column(nullable = false)
    private String action;
	
	@Lob
    private String details;

}
