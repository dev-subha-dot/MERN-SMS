import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Header() {
  const [open, setOpen] = useState(false); // dropdown state
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand px-custom fw-bold text-primary" href="javascript:void(0)">
            RS-TECH
          </a>

          <div className="d-flex align-items-center">
            <a href="javascript:void(0)" className="text-dark me-4">
              <i className="bi bi-gear fs-4"></i>
            </a>

            <a href="javascript:void(0)" className="text-dark me-4 position-relative">
              <i className="bi bi-bell fs-4"></i>
            </a>

            {/* Profile dropdown */}
            <div className="dropdown">
              <img
                src="src/assets/profile.png"
                alt="profile"
                className="rounded-circle profile-img"
                style={{ cursor: "pointer", width: "40px", height: "40px" }}
                onClick={() => setOpen(!open)}
              />
              {open && (
                <ul
                  className="dropdown-menu dropdown-menu-end show mt-2"
                  style={{ position: "absolute", right: 0 }}
                >
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>


  );
}
