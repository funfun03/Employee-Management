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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">
            {error
              ? `Error loading employee: ${error.message}`
              : "Employee not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EmployeeForm employee={data.data} isEdit={true} />
    </div>
  );
};
