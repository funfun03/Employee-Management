package com.example.employee_api.dto;

import java.time.LocalDate;

import com.example.employee_api.model.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

public class CreateEmployeeRequest {
    @NotBlank
    @Size(min = 4, max = 160)
    private String fullName;

    @NotBlank
    @Email
    private String email;

    private LocalDate dateOfBirth;

    private Gender gender;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    private boolean active = true;
}
