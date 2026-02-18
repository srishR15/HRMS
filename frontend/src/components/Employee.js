import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import { getEmployees } from "../hrmsApi";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <EmployeeForm setEmployees={setEmployees} employees={employees} />
      <EmployeeList employees={employees} setEmployees={setEmployees} />
    </div>
  );
};

export default Employee;
