package com.example.employee_api.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employee_api.dto.CreateEmployeeRequest;
import com.example.employee_api.dto.EmployeeDto;
import com.example.employee_api.dto.UpdateEmployeeRequest;
import com.example.employee_api.exception.BadRequestException;
import com.example.employee_api.exception.NotFoundException;
import com.example.employee_api.model.Employee;
import com.example.employee_api.repository.EmployeeRepository;
// import com.example.employee_api.service.impl.EmployeeService;
import com.example.employee_api.util.EmployeeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public java.util.List<EmployeeDto> getAll() {
        return employeeRepository.findAll().stream()
                .map(EmployeeMapper::toDTO)
                .toList();
    }

    @Override
    public EmployeeDto create(CreateEmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        String hashed = passwordEncoder.encode(request.getPassword());

        // Create and save employee entity
        Employee entity = Employee.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .hashedPassword(hashed)
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .phoneNumber(request.getPhoneNumber())
                .active(request.isActive())
                .build();
        Employee saved = employeeRepository.save(entity);
        return EmployeeMapper.toDTO(saved);
    }

    @Override
    public EmployeeDto getById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        return EmployeeMapper.toDTO(employee);
    }

    @Override
    public EmployeeDto update(Long id, UpdateEmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        // Update employee fields
        employee.setFullName(request.getFullName());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setGender(request.getGender());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setActive(request.isActive());

        Employee updated = employeeRepository.save(employee);
        return EmployeeMapper.toDTO(updated);
    }

    @Override
    public void delete(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        employeeRepository.delete(employee);
    }

}
