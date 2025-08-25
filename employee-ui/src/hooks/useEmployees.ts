import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '../api/employeeApi';
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/employee';

// Query keys
export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (filters: string) => [...employeeKeys.lists(), { filters }] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

// Get all employees
export const useEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.lists(),
    queryFn: employeeApi.getAll,
  });
};

// Get employee by ID
export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeeApi.getById(id),
    enabled: !!id,
  });
};

// Create employee mutation
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => employeeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
};

// Update employee mutation
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeRequest }) =>
      employeeApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(id) });
    },
  });
};

// Delete employee mutation
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => employeeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
};
