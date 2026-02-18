import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Your FastAPI backend

// Employees
export const getEmployees = async () => {
  const response = await axios.get(`${API_BASE}/employees/`);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(`${API_BASE}/employees/`, employee);
  return response.data;
};

export const deleteEmployee = async (employee_id) => {
  await axios.delete(`${API_BASE}/employees/${employee_id}`);
};

// Attendance
export const getAttendance = async (employee_id) => {
  const response = await axios.get(`${API_BASE}/attendance/${employee_id}`);
  return response.data;
};

export const markAttendance = async (attendance) => {
  const response = await axios.post(`${API_BASE}/attendance/`, attendance);
  return response.data;
};