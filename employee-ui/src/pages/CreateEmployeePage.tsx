import React from "react";
import { EmployeeForm } from "../components/EmployeeForm";

export const CreateEmployeePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <EmployeeForm />
    </div>
  );
};
