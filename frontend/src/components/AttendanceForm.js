import React, { useState, useEffect } from "react";
import { getEmployees, markAttendance } from "../hrmsApi";

const AttendanceForm = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [employee_id, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance({ employee_id: parseInt(employee_id), status, date });
      refresh(); // trigger AttendanceList refresh
      setEmployeeId("");
      setStatus("Present");
    } catch (err) {
      alert(err.response?.data?.detail || "Error marking attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cardbg p-6 rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <select
        value={employee_id}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
        required
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name} ({emp.department})
          </option>
        ))}
      </select>

      <div className="date-wrapper">
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    max={new Date().toISOString().slice(0, 10)}
    className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
    required
  />
</div>


      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
        required
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button type="submit" className="bg-button px-4 py-2 rounded-md hover:bg-buttonHover transition">
        Mark Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
