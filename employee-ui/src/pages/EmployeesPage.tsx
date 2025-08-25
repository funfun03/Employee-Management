import React from "react";
import { EmployeeList } from "../components/EmployeeList";

export const EmployeesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <EmployeeList />
    </div>
  );
};
