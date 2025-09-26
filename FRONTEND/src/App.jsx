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
import PrivateRoute from "./Components/PrivateRoute"; // import the wrapper

// Style
import "./global.css";


// Custom wrapper for Auth routes
function PublicRoute({ children }) {
  const token = localStorage.getItem("token"); // your token key

  if (token) {
    // If token exists, redirect back to previous page or /employee
    return <Navigate to="/employee" replace />;
  }

  return children;
}

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
            <PublicRoute>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </PublicRoute>

          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthLayout>
                <Register />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* Authenticated routes */}
        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <MainLayout>
                <Employees />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/addemployee"
          element={
            <PrivateRoute>
              <MainLayout>
                <ManageEmployee />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/addemployee/:mode/:id"
          element={
            <PrivateRoute>
              <MainLayout>
                <ManageEmployee />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
