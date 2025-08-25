package com.example.employee_api.dto;

import java.time.LocalDate;

import com.example.employee_api.model.Gender;

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

public class UpdateEmployeeRequest {
    @NotBlank(message = "Full name is required and cannot be empty")
    @Size(min = 4, max = 160, message = "Full name must be between 4 and 160 characters")
    private String fullName;

    private LocalDate dateOfBirth;

    private Gender gender;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Phone number must be valid format (e.g., 0123456789 or +84123456789)")
    private String phoneNumber;

    private boolean active;
}
