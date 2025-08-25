import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEmployee, useDeleteEmployee } from "../hooks/useEmployees";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading employee: {error.message}</p>
        <Link to="/employees">
          <Button variant="secondary" className="mt-4">
            Back to List
          </Button>
        </Link>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">Employee not found</p>
        <Link to="/employees">
          <Button variant="secondary" className="mt-4">
            Back to List
          </Button>
        </Link>
      </div>
    );
  }

  const employee = data.data;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Employee Details</h1>
        <div className="space-x-4">
          <Link to="/employees">
            <Button variant="secondary">Back to List</Button>
          </Link>
          <Link to={`/employees/${employee.id}/edit`}>
            <Button>Edit Employee</Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteEmployee.isPending}
          >
            {deleteEmployee.isPending ? "Deleting..." : "Delete Employee"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Full Name
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {employee.fullName}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{employee.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Phone Number
              </label>
              <p className="text-gray-900">{employee.phoneNumber}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Date of Birth
              </label>
              <p className="text-gray-900">
                {new Date(employee.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Gender
              </label>
              <p className="text-gray-900">
                <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {employee.gender}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
              <p className="text-gray-900">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    employee.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.active ? "Active" : "Inactive"}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Employee ID
              </label>
              <p className="text-gray-900">#{employee.id}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Created Date
              </label>
              <p className="text-gray-900">
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
              <label className="text-sm font-medium text-gray-500">
                Last Updated
              </label>
              <p className="text-gray-900">
                {new Date(employee.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
