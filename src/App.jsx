import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Register from "./Component/Register";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
