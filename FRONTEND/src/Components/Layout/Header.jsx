import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Header() {
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

            <a
              href="javascript:void(0)"
            >
              <img
                src="src/assets/profile.png"
                alt="profile"
                className="rounded-circle profile-img"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>


  );
}
