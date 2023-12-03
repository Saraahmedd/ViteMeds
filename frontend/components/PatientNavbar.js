// Import necessary libraries and components
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FiUser, FiShoppingCart, FiLogOut, FiUnlock } from "react-icons/fi";
import { logoutAction } from "@/app/redux/actions/authActions";
import { NavDropdown } from "react-bootstrap";
// ... (import statements remain the same)

// PatientNavbar component
const PatientNavbar = () => {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logoutAction());
    handleCloseDropdown();
  };

  // Function to handle change password (you can replace this with your actual logic)
  const handleChangePassword = () => {
    // Implement your logic for changing the password
    console.log("Changing password");
    handleCloseDropdown();
  };

  // Function to toggle the dropdown visibility
  const handleToggleDropdown = () => {
    console.log("Toggling dropdown visibility");
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Back button */}
        <Image
          src="https://via.placeholder.com/50"
          alt="Logo"
          width={50}
          height={50}
        />

        {/* Dummy Logo */}

        {/* Icons and Dropdown */}
        <div className="d-flex align-items-center position-relative">
          {/* User Icon with dropdown toggle */}
          <div
            className="mx-2 pointer-cursor position-relative"
            onClick={handleToggleDropdown}
            onBlur={handleCloseDropdown}
            tabIndex={0}
          >
            {/* Dropdown Content */}

            <NavDropdown
              title={<FiUser size={24} color="#007bff" />}
              id="basic-nav-dropdown"
              alignRight
            >
              {/* //TODO: Handle on click for logout to call the action + change
              //password to open the modal */}
              <NavDropdown.Item href="/guest/login">Logout</NavDropdown.Item>
              <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
            </NavDropdown>
          </div>

          {/* Shopping Cart Icon */}
          <FiShoppingCart size={24} color="#007bff" className="mx-2" />
        </div>
      </div>
    </nav>
  );
};

// Export the PatientNavbar component
export default PatientNavbar;
