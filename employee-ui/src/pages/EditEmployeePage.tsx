import React from "react";
import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployees";
import { EmployeeForm } from "../components/EmployeeForm";

export const EditEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id || "0");
  const { data, isLoading, error } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
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
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <p style={{ color: "#dc2626", margin: 0 }}>
            {error
              ? `Error loading employee: ${error.message}`
              : "Employee not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <EmployeeForm employee={data.data} isEdit={true} />
    </div>
  );
};
