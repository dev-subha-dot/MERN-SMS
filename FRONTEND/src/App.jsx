import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./Components/Layout/MainLayout";
import AuthLayout from "./Components/Layout/AuthLayout";

// Pages
import Employees from "./Components/Page/Employee";
import ManageEmployee from "./Components/Page/ManageEmployee";
import Login from "./Components/Page/Login";
import Register from "./Components/Page/Register";

// Style
import "./global.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* { Defulat Redirection} */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Unauthenticated routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Authenticated routes */}
        <Route
          path="/employee"
          element={
            <MainLayout>
              <Employees />
            </MainLayout>
          }
        />
        <Route
          path="/addemployee"
          element={
            <MainLayout>
              <ManageEmployee />
            </MainLayout>
          }
        />
        <Route
          path="/addemployee/:mode/:id"
          element={
            <MainLayout>
              <ManageEmployee />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
