import React, { useState } from "react";
import AddStudent from "./AddStudent";
import ViewStudent from "./ViewStudents";


const Student = () => {
  const [view, setView] = useState(""); 

  return (
    <div>
      {/* <h3 className="mb-4">Student Management</h3> */}

      {/* Buttons */}
      <div className="mb-4" style={{marginLeft:"100px",width:"800px",position:"absolute",top:"50px",left:"200px"}}>
        <button
          className="btn btn-primary me-3"
          onClick={() => setView("add")}>
          Add Student
        </button>
        <button
          className="btn btn-secondary "
          onClick={() => setView("view")}
        >
          View Students
        </button>
      </div>

      {/* Conditional content */}
      <div>
        {view === "add" && <AddStudent />}
        {view === "view" && <ViewStudent />}

      </div>
    </div>
  );
};

export default Student;
