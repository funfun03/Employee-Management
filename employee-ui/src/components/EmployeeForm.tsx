import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useCreateEmployee, useUpdateEmployee } from "../hooks/useEmployees";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import type { Employee } from "../types/employee";

const employeeSchema = z.object({
  fullName: z
    .string()
    .min(4, "Full name must be at least 4 characters")
    .max(160, "Full name must be at most 160 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters")
    .optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender is required",
  }),
  phoneNumber: z
    .string()
    .regex(/^\\+?[0-9. ()-]{7,25}$/, "Invalid phone number format"),
  active: z.boolean(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  isEdit?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee
      ? {
          fullName: employee.fullName,
          email: employee.email,
          dateOfBirth: employee.dateOfBirth,
          gender: employee.gender,
          phoneNumber: employee.phoneNumber,
          active: employee.active,
        }
      : {
          active: true,
        },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (isEdit && employee) {
        const { password, email, ...updateData } = data;
        await updateEmployee.mutateAsync({
          id: employee.id,
          data: updateData,
        });
        alert("Employee updated successfully!");
      } else {
        if (!data.password) {
          alert("Password is required for new employees");
          return;
        }
        await createEmployee.mutateAsync({
          ...data,
          password: data.password,
        });
        alert("Employee created successfully!");
      }
      navigate("/employees");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An error occurred";
      alert(
        `Failed to ${isEdit ? "update" : "create"} employee: ${errorMessage}`
      );
    }
  };

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Employee" : "Add New Employee"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                placeholder="Enter full name"
              />

              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Enter email address"
                disabled={isEdit}
              />
            </div>

            {!isEdit && (
              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Enter password"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date of Birth"
                type="date"
                {...register("dateOfBirth")}
                error={errors.dateOfBirth?.message}
              />

              <Select
                label="Gender"
                {...register("gender")}
                error={errors.gender?.message}
                options={genderOptions}
              />
            </div>

            <Input
              label="Phone Number"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
              placeholder="Enter phone number"
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                {...register("active")}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="active"
                className="text-sm font-medium text-gray-700"
              >
                Active Employee
              </label>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  createEmployee.isPending ||
                  updateEmployee.isPending
                }
                className="flex-1"
              >
                {isSubmitting ||
                createEmployee.isPending ||
                updateEmployee.isPending
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update Employee"
                  : "Create Employee"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/employees")}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
