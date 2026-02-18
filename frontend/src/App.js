import React, { useState } from "react";
import Employee from "./components/Employee";
import Attendance from "./components/Attendance";

function App() {
  const [currentPage, setCurrentPage] = useState("employees");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HRMS Dashboard</h1>
        <nav className="nav-buttons">
          <button
            className={currentPage === "employees" ? "active" : ""}
            onClick={() => setCurrentPage("employees")}
          >
            Employees
          </button>
          <button
            className={currentPage === "attendance" ? "active" : ""}
            onClick={() => setCurrentPage("attendance")}
          >
            Attendance
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === "employees" && <Employee />}
        {currentPage === "attendance" && <Attendance />}
      </main>
    </div>
  );
}

export default App;