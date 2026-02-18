// AttendanceList.js
import React, { useState, useEffect } from "react";
import { getEmployees, getAttendance } from "../hrmsApi";

const AttendanceList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  // Fetch employees once
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Fetch attendance when selected employee changes
  const fetchAttendance = async (id) => {
    if (!id) return setAttendance([]);
    const data = await getAttendance(id);
    setAttendance(data);
  };

  useEffect(() => {
    fetchAttendance(selectedId);
    setFilterDate(""); // reset date filter when employee changes
  }, [selectedId]);

  // Filtered attendance by date
  const filteredAttendance = filterDate
    ? attendance.filter(att => att.date === filterDate)
    : attendance;

  // Total present days
  const totalPresent = attendance.filter(att => att.status === "Present").length;

  return (
    <div className="bg-cardbg p-6 rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

      {/* Dashboard summary */}
      {selectedId && (
  <div className="bg-cardbg p-4 rounded-md mb-6 w-full attendance-summary">
    <h3 className="summary-heading mb-3">Attendance Summary</h3>

    <div className="summary-row">
      <span>Total Employees</span>
      <span>{employees.length}</span>
    </div>

    <div className="summary-row">
      <span>Attendance Records</span>
      <span>{attendance.length}</span>
    </div>

    <div className="summary-row">
      <span>Present Days</span>
      <span className="text-green-400">{totalPresent}</span>
    </div>
  </div>
)}

      {/* Employee select */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name} ({emp.department})
          </option>
        ))}
      </select>

      {/* Filter by date */}
      {attendance.length > 0 && (
        <div className="date-wrapper">
    <input
      type="date"
      value={filterDate}
      onChange={(e) => setFilterDate(e.target.value)}
      max={new Date().toISOString().slice(0, 10)}
      className="w-full p-2 mb-3 rounded-md bg-darkbg text-white"
    />
  </div>
      )}

      {/* Attendance list */}
      {filteredAttendance.length === 0 ? (
        <p>No attendance records.</p>
      ) : (
        <ul>
          {filteredAttendance.map((att) => (
            <li
              key={att.id}
              className="py-1 border-b border-gray-700 flex justify-between"
            >
              <span>{att.date}</span>
              <span
                className={`${
                  att.status === "Present" ? "text-green-400" : "text-red-500"
                } font-semibold`}
              >
                {att.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList;
