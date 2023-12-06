"use client";
import React, { useState } from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import {
  FiUser,
  FiShoppingCart,
  FiLogOut,
  FiArrowLeftCircle,
  FiDollarSign,
} from "react-icons/fi"; // You can choose different icons as per your preference
import "./sidebar.css";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      className={`sidebar${expanded ? " expanded" : ""}`}
      expand="lg"
      style={{ backgroundColor: "#f5f5f5" }}
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          {/* Top Links */}
          <div style={{ marginBottom: "500px" }}>
            <a onClick={() => history.back()} className="nav-link mt-2">
              <FiArrowLeftCircle className="icon" />
              {expanded && <span>Go Back</span>}
            </a>
            <a href="/pharmacists/profile" className="nav-link mt-2">
              <FiUser className="icon" />
              {expanded && <span>Profile</span>}
            </a>

            <a href="/pharmacists/medicines" className="nav-link">
              <FiShoppingCart className="icon" />
              {expanded && <span>Shopping</span>}
            </a>

            <a href="/pharmacists/salesReport" className="nav-link">
              <FiDollarSign className="icon" />
              {expanded && <span>Sales Report</span>}
            </a>
          </div>
          {/* Move the Logout link to the top */}
          <a href="/guest/login" className="nav-link logout">
            <FiLogOut className="icon" />
            {expanded && <span>Logout</span>}
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Sidebar;
