package com.example.employee_api.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.employee_api.model.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private boolean active;
    private String hashedPassword;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
