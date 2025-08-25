import React from "react";
import { EmployeeDetail } from "../components/EmployeeDetail";

export const EmployeeDetailPage: React.FC = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <EmployeeDetail />
    </div>
  );
};
