import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Sidebar() {
  const menuItems = [
    { path: "/", label: "Dashboard", icon: "bi-speedometer2" },
    { path: "/employee", label: "Employees", icon: "bi-people" },
    { path: "/calendar", label: "Calendar", icon: "bi-calendar-minus-fill" },
    { path: "/message", label: "Message", icon: "bi-chat-text-fill" },
  ];
  return (
    <div className="sidebar bg-light">
      <ul className="nav flex-column ">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item mb-2">
            <Link to={item.path} className="nav-link d-flex align-items-center">
              <i className={`bi ${item.icon} me-3`}></i> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
