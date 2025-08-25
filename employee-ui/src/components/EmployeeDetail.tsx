import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEmployee, useDeleteEmployee } from "../hooks/useEmployees";

export const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = parseInt(id || "0");
  const { data, isLoading, error } = useEmployee(employeeId);
  const deleteEmployee = useDeleteEmployee();

  const handleDelete = async () => {
    if (!data?.data) return;

    if (
      window.confirm(`Are you sure you want to delete ${data.data.fullName}?`)
    ) {
      try {
        await deleteEmployee.mutateAsync(employeeId);
        alert("Employee deleted successfully!");
        navigate("/employees");
      } catch (error) {
        alert("Failed to delete employee");
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "6px",
          padding: "16px",
        }}
      >
        <p style={{ color: "#dc2626", margin: "0 0 16px 0" }}>
          Error loading employee: {error.message}
        </p>
        <Link to="/employees">
          <button
            style={{
              backgroundColor: "#f3f4f6",
              color: "black",
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Back to List
          </button>
        </Link>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div
        style={{
          backgroundColor: "#fefce8",
          border: "1px solid #fde68a",
          borderRadius: "6px",
          padding: "16px",
        }}
      >
        <p style={{ color: "#92400e", margin: "0 0 16px 0" }}>
          Employee not found
        </p>
        <Link to="/employees">
          <button
            style={{
              backgroundColor: "#f3f4f6",
              color: "black",
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Back to List
          </button>
        </Link>
      </div>
    );
  }

  const employee = data.data;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
          Employee Details
        </h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/employees">
            <button
              style={{
                backgroundColor: "#f3f4f6",
                color: "black",
                padding: "8px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Back to List
            </button>
          </Link>
          <Link to={`/employees/${employee.id}/edit`}>
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Edit Employee
            </button>
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteEmployee.isPending}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              opacity: deleteEmployee.isPending ? 0.6 : 1,
            }}
          >
            {deleteEmployee.isPending ? "Deleting..." : "Delete Employee"}
          </button>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "black",
                margin: 0,
              }}
            >
              Personal Information
            </h3>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Full Name
              </label>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "black",
                  margin: 0,
                }}
              >
                {employee.fullName}
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Email
              </label>
              <p style={{ color: "black", margin: 0 }}>{employee.email}</p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Phone Number
              </label>
              <p style={{ color: "black", margin: 0 }}>
                {employee.phoneNumber}
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Date of Birth
              </label>
              <p style={{ color: "black", margin: 0 }}>
                {new Date(employee.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Gender
              </label>
              <span
                style={{
                  display: "inline-flex",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "20px",
                  backgroundColor: "#dbeafe",
                  color: "black",
                }}
              >
                {employee.gender}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "black",
                margin: 0,
              }}
            >
              Employment Status
            </h3>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Status
              </label>
              <span
                style={{
                  display: "inline-flex",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "20px",
                  backgroundColor: employee.active ? "#dcfce7" : "#fee2e2",
                  color: "black",
                }}
              >
                {employee.active ? "Active" : "Inactive"}
              </span>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Employee ID
              </label>
              <p style={{ color: "black", margin: 0 }}>#{employee.id}</p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Created Date
              </label>
              <p style={{ color: "black", margin: 0 }}>
                {new Date(employee.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#6b7280",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Last Updated
              </label>
              <p style={{ color: "black", margin: 0 }}>
                {new Date(employee.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
