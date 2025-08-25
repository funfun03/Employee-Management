import { Routes, Route, Navigate } from "react-router-dom";
import { EmployeesPage } from "./pages/EmployeesPage";
import { CreateEmployeePage } from "./pages/CreateEmployeePage";
import { EditEmployeePage } from "./pages/EditEmployeePage";
import { EmployeeDetailPage } from "./pages/EmployeeDetailPage";
import "./App.css";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/new" element={<CreateEmployeePage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
      </Routes>
    </div>
  );
}

export default App;
