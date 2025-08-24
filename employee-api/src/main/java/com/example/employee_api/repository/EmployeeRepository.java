package com.example.employee_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.employee_api.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmail(String email);
}
