import React from "react";
import { EmployeeList } from "../components/EmployeeList";

export const EmployeesPage: React.FC = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <EmployeeList />
    </div>
  );
};
