package com.example.employee_api.service;

import java.util.List;

import com.example.employee_api.dto.CreateEmployeeRequest;
import com.example.employee_api.dto.EmployeeDto;
import com.example.employee_api.dto.UpdateEmployeeRequest;

public interface EmployeeService {
    EmployeeDto create(CreateEmployeeRequest request);

    List<EmployeeDto> getAll();

    EmployeeDto getById(Long id);

    EmployeeDto update(Long id, UpdateEmployeeRequest request);

    void delete(Long id);
}
