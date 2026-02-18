import React, { useState } from "react";
import { deleteEmployee } from "../hrmsApi";
import ConfirmModal from "./ConfirmModal";

const EmployeeList = ({ employees, setEmployees }) => {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees(employees.filter((emp) => emp.employee_id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="bg-cardbg p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li
              key={emp.employee_id}
              className="flex justify-between items-center py-2 border-b border-gray-700"
            >
              <div>
                {emp.full_name} | {emp.email} | {emp.department}
              </div>
              <button
                onClick={() => setConfirmDelete(emp.employee_id)}
                className="bg-red px-3 py-1 rounded-md hover:bg-redHover transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this employee?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
