// Package
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Components
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import Employees from "./Components/Page/Employee";
import ManageEmployee from "./Components/Page/ManageEmployee";

// Style
import "./global.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-auto bg-light ">
            <div className="sidebar">
              <Sidebar />
            </div>
          </div>
          <main className="col-md-9 col-lg px-4">
            <div className="content">
              <Routes>
                <Route path="/employee" element={<Employees />} />
                <Route path="/addemployee" element={<ManageEmployee />} />
                <Route path="/addemployee/:mode/:id" element={<ManageEmployee />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
