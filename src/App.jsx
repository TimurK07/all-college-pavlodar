import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollegeList from "./components/CollegeList/CollegeList";
import CollegeDetail from "./components/CollegeDetail/CollegeDetail";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CollegeList />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
