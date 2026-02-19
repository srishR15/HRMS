import React, { useState } from "react";
import { addEmployee, getEmployees } from "../hrmsApi";

const EmployeeForm = ({ employees, setEmployees }) => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({ full_name, email, department });

      // Refetch employees to update the list instantly
      const data = await getEmployees();
      setEmployees(data);

      setFullName("");
      setEmail("");
      setDepartment("");
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || "Error adding employee");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cardbg p-6 rounded-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
        required
      />
      <button
        type="submit"
        className="bg-primary px-4 py-2 rounded-md hover:bg-primaryHover transition"
      >
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
