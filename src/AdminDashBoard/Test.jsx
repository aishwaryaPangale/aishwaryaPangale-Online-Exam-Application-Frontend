import React, { useState } from "react";
import AddTest from "./AddTest";
import ViewTest from "./ViewTest";
import AddQuestion from "./AddQuestion";
import CreatePaperSet from "./CreatePaperSet";


const Test = () => {
  const [selectedSection, setSelectedSection] = useState("");

  const renderSection = () => {
    switch (selectedSection) {
      case "add":
        return <AddTest />;
      case "view":
        return <ViewTest />;
      case "question":
        return <AddQuestion />;
      case "paper":
        return <CreatePaperSet/>;
      default:
        return (
          <div className="text-center mt-5">
            <h4>Select a section to continue</h4>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center gap-3 mb-4" style={{width:"800px",position:"absolute",top:"50px",left:"120px"}}>
        <span
          className="badge bg-primary p-3 fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedSection("add")}
        >
          Add Test
        </span>
        <span
          className="badge  bg-secondary p-3 fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedSection("view")}
        >
          View Test
        </span>
        <span
          className="badge bg-warning text-dark p-3 fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedSection("question")}
        >
          Add Question
        </span>
        <span
          className="badge bg-info text-dark p-3 fs-6"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedSection("paper")}
        >
          Paper Set
        </span>
      </div>

      <div>{renderSection()}</div>
    </div>
  );
};

export default Test;
