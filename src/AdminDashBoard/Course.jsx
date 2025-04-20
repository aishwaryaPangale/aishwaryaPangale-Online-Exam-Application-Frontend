 // src/components/CourseDashboard.js
import React, { useState } from "react";
import AddCourse from "./AddCourse";
import ViewCourse from "./ViewCourse";

const Course = () => {
  const [activeView, setActiveView] = useState("");

  return (
    <div className="container shadow p-4 bg-transparent " >
      {/* <h2 className="mb-4">Course Management</h2> */}
      <div className="mb-3 d-flex gap-3" style={{marginLeft:"100px",width:"800px",position:"absolute",top:"50px",left:"200px"}}>
        <button className="btn btn-primary" onClick={() => setActiveView("add")}>
          Add Course
        </button>
        <button className="btn btn-secondary" onClick={() => setActiveView("view")}>
          View Courses
        </button>
      </div>

      <div className="mt-4">
        {activeView === "add" && <AddCourse />}
        {activeView === "view" && <ViewCourse />}
      </div>
    </div>
  );
};

export default Course;
