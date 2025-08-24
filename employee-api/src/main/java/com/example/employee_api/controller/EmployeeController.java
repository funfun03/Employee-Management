package com.example.employee_api.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employee_api.dto.ApiResponse;
import com.example.employee_api.dto.CreateEmployeeRequest;
import com.example.employee_api.dto.EmployeeDto;
import com.example.employee_api.dto.UpdateEmployeeRequest;
import com.example.employee_api.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    // POST /api/employees
    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeDto>> createEmployee(@Valid @RequestBody CreateEmployeeRequest request) {
        EmployeeDto dto = employeeService.create(request);
        return ResponseEntity
                .created(URI.create("/api/employees/" + dto.getId()))
                .body(ApiResponse.ok(dto));
    }

    // GET /api/employees
    @GetMapping
    public ResponseEntity<ApiResponse<List<EmployeeDto>>> getAllEmployees() {
        List<EmployeeDto> dtos = employeeService.getAll();
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    // GET /api/employees/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDto>> getEmployeeById(@PathVariable Long id) {
        EmployeeDto dto = employeeService.getById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    // PUT /api/employees/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDto>> updateEmployee(@PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeRequest request) {
        EmployeeDto dto = employeeService.update(id, request);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    // DELETE /api/employees/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
