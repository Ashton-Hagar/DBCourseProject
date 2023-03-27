import React from "react";
import "./App.css";
import CustomerSearch from "./CustomerSearch";
import EmployeeSearch from "./EmployeeSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hotel Booking Application</h1>
      </header>
      <main>
        <CustomerSearch />
      </main>
    </div>
  );
}

export default App;
