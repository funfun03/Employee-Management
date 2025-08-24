package com.example.employee_api.util;

import com.example.employee_api.dto.EmployeeDto;
import com.example.employee_api.model.Employee;

public class EmployeeMapper {
    public static EmployeeDto toDTO(Employee employee) {
        if (employee == null) {
            return null;
        }
        return EmployeeDto.builder()
                .id(employee.getId())
                .fullName(employee.getFullName())
                .email(employee.getEmail())
                .dateOfBirth(employee.getDateOfBirth())
                .gender(employee.getGender())
                .phoneNumber(employee.getPhoneNumber())
                .active(employee.isActive())
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }
}
