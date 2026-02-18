import React, { useState } from "react";
import AttendanceForm from "./AttendanceForm";
import AttendanceList from "./AttendanceList";

const Attendance = () => {
  const [refresh, setRefresh] = useState(false); // trigger refresh

  return (
    <div>
      <AttendanceForm refresh={() => setRefresh(!refresh)} />
      <AttendanceList refresh={refresh} />
    </div>
  );
};

export default Attendance;