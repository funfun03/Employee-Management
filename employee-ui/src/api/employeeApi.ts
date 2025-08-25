import axios from 'axios';
import type { ApiResponse, Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employee';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeApi = {
  // Get all employees
  getAll: (): Promise<ApiResponse<Employee[]>> =>
    apiClient.get('/employees').then(res => res.data),

  // Get employee by ID
  getById: (id: number): Promise<ApiResponse<Employee>> =>
    apiClient.get(`/employees/${id}`).then(res => res.data),

  // Create new employee
  create: (data: CreateEmployeeRequest): Promise<ApiResponse<Employee>> =>
    apiClient.post('/employees', data).then(res => res.data),

  // Update employee
  update: (id: number, data: UpdateEmployeeRequest): Promise<ApiResponse<Employee>> =>
    apiClient.put(`/employees/${id}`, data).then(res => res.data),

  // Delete employee
  delete: (id: number): Promise<void> =>
    apiClient.delete(`/employees/${id}`).then(res => res.data),
};
