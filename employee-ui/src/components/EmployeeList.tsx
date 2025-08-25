import React from "react";
import { Link } from "react-router-dom";
import { useEmployees, useDeleteEmployee } from "../hooks/useEmployees";
import type { Employee } from "../types/employee";

export const EmployeeList: React.FC = () => {
  const { data, isLoading, error } = useEmployees();
  const deleteEmployee = useDeleteEmployee();

  // Debug logs
  console.log("EmployeeList Debug:", { data, isLoading, error });

  // Temporary test data
  const testEmployees: Employee[] = [
    {
      id: 1,
      fullName: "Test Employee 1",
      email: "test1@example.com",
      phoneNumber: "0123456789",
      dateOfBirth: "1990-01-01",
      gender: "MALE" as const,
      active: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      fullName: "Test Employee 2",
      email: "test2@example.com",
      phoneNumber: "0987654321",
      dateOfBirth: "1995-05-15",
      gender: "FEMALE" as const,
      active: false,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ];

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteEmployee.mutateAsync(id);
        alert("Employee deleted successfully!");
      } catch (error) {
        alert("Failed to delete employee");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading employees: {error.message}</p>
        <p className="text-sm text-gray-600 mt-2">Using test data instead:</p>
      </div>
    );
  }

  // Use real data if available, otherwise use test data
  const employees = data?.data || testEmployees;

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "black",
            margin: 0,
          }}
        >
          Employee Management
        </h1>
        <Link to="/employees/new">
          <button
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Add New Employee
          </button>
        </Link>
      </div>

      {employees.length === 0 ? (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p
            style={{ color: "#6b7280", fontSize: "18px", margin: "0 0 16px 0" }}
          >
            No employees found
          </p>
          <Link to="/employees/new">
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Add First Employee
            </button>
          </Link>
        </div>
      ) : (
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
                fontSize: "18px",
                fontWeight: "600",
                color: "black",
                margin: 0,
              }}
            >
              Employees ({employees.length})
            </h3>
          </div>
          <div style={{ padding: 0 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f9fafb" }}>
                  <tr>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Gender
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {employees.map((employee: Employee) => (
                    <tr
                      key={employee.id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "16px 24px" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "black",
                          }}
                        >
                          {employee.fullName}
                        </div>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          Born:{" "}
                          {new Date(employee.dateOfBirth).toLocaleDateString()}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          color: "black",
                        }}
                      >
                        {employee.email}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          fontSize: "14px",
                          color: "black",
                        }}
                      >
                        {employee.phoneNumber}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "4px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            borderRadius: "20px",
                            backgroundColor: "#dbeafe",
                            color: "black",
                            border: "1px solid #93c5fd",
                          }}
                        >
                          {employee.gender}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "4px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            borderRadius: "20px",
                            backgroundColor: employee.active
                              ? "#dcfce7"
                              : "#fee2e2",
                            color: "black",
                            border: employee.active
                              ? "1px solid #86efac"
                              : "1px solid #fca5a5",
                          }}
                        >
                          {employee.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Link to={`/employees/${employee.id}`}>
                            <button
                              style={{
                                backgroundColor: "#f3f4f6",
                                color: "black",
                                padding: "6px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              View
                            </button>
                          </Link>
                          <Link to={`/employees/${employee.id}/edit`}>
                            <button
                              style={{
                                backgroundColor: "#f3f4f6",
                                color: "black",
                                padding: "6px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            style={{
                              backgroundColor: "#dc2626",
                              color: "white",
                              padding: "6px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              opacity: deleteEmployee.isPending ? 0.5 : 1,
                            }}
                            onClick={() =>
                              handleDelete(employee.id, employee.fullName)
                            }
                            disabled={deleteEmployee.isPending}
                          >
                            {deleteEmployee.isPending
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
