import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useCreateEmployee, useUpdateEmployee } from "../hooks/useEmployees";
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
  phoneNumber: z.string().regex(/^\d{9,12}$/, "Invalid phone number format"),
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
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "black",
              margin: 0,
            }}
          >
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h3>
        </div>
        <div style={{ padding: "24px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                    marginBottom: "6px",
                  }}
                >
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  placeholder="Enter full name"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
                {errors.fullName && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                    marginBottom: "6px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter email address"
                  disabled={isEdit}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "black",
                    backgroundColor: isEdit ? "#f9fafb" : "white",
                    opacity: isEdit ? 0.6 : 1,
                  }}
                />
                {errors.email && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {!isEdit && (
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                    marginBottom: "6px",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter password"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
                {errors.password && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                    marginBottom: "6px",
                  }}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
                {errors.dateOfBirth && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                    marginBottom: "6px",
                  }}
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "black",
                  marginBottom: "6px",
                }}
              >
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                placeholder="Enter phone number"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "black",
                  backgroundColor: "white",
                }}
              />
              {errors.phoneNumber && (
                <p
                  style={{
                    color: "#dc2626",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "30px",
              }}
            >
              <input
                type="checkbox"
                id="active"
                {...register("active")}
                style={{ width: "16px", height: "16px" }}
              />
              <label
                htmlFor="active"
                style={{ fontSize: "14px", fontWeight: "500", color: "black" }}
              >
                Active Employee
              </label>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  createEmployee.isPending ||
                  updateEmployee.isPending
                }
                style={{
                  flex: 1,
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity:
                    isSubmitting ||
                    createEmployee.isPending ||
                    updateEmployee.isPending
                      ? 0.6
                      : 1,
                }}
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
              </button>
              <button
                type="button"
                onClick={() => navigate("/employees")}
                style={{
                  flex: 1,
                  backgroundColor: "#f3f4f6",
                  color: "black",
                  padding: "12px 24px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
