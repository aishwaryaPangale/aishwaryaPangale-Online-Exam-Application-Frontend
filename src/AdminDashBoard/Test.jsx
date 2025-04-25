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
        return <CreatePaperSet />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center gap-3 mb-4" style={{ width: "800px", position: "absolute", top: "50px", left: "120px" }}>
        <button
          className="btn btn-primary"
          onClick={() => setSelectedSection("add")}
        >
          Add Test
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedSection("view")}
        >
          View Test
        </button>
        <button
          className="btn btn-warning text-dark"
          onClick={() => setSelectedSection("question")}
        >
          Add Question
        </button>
        <button
          className="btn btn-info text-dark"
          onClick={() => setSelectedSection("paper")}
        >
          Paper Set
        </button>
      </div>

      <div>{renderSection()}</div>
    </div>
  );
};

export default Test;
