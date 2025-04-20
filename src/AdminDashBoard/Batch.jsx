import React, { useState } from "react";
import AddBatch from "./AddBatch";     // Your Add Batch Component
import ViewBatch from "./ViewBatch";   // Your View Batch Component

const Batch = () => {
  const [activeTab, setActiveView] = useState("");

  return (
    <div className="container mt-4">
      {/* <h3 className="text-center mb-4">Batch Management</h3> */}
      <div className="d-flex  gap-3 mb-4" style={{marginLeft:"100px",width:"800px",position:"absolute",top:"50px",left:"200px"}}>
      <button className="btn btn-primary" onClick={() => setActiveView("add")}>
          Add Batch
        </button>
        <button className="btn btn-secondary" onClick={() => setActiveView("view")}>
          View Batch
        </button>
      </div>

      {/* Conditional rendering of Add or View */}
      {activeTab === "add" && <AddBatch />}
      {activeTab === "view" && <ViewBatch />}
    </div>
  );
};

export default Batch;
