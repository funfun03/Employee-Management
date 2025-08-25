export interface Employee {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  active: boolean;
}

export interface UpdateEmployeeRequest {
  fullName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  active: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: ApiError | null;
  timestamp: string;
}

export interface ApiError {
  message: string;
  code: string;
  details: Record<string, any>;
}
