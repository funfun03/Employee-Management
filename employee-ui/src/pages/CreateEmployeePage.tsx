import React from "react";
import { EmployeeForm } from "../components/EmployeeForm";

export const CreateEmployeePage: React.FC = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <EmployeeForm />
    </div>
  );
};
