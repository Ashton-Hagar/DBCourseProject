import React from "react";
import "./App.css";
import CustomerSearch from "./CustomerSearch.js";
import LoginPage from "./LoginPage.js";
import EmployeeSearch from "./EmployeeSearch.js";
import AdminSearch from "./AdminSearch.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hotel Booking Application</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/CustomerSearch" element={<CustomerSearch />} />
            <Route path="/EmployeeSearch" element={<EmployeeSearch />} />
            <Route path="/AdminSearch" element={<AdminSearch />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
