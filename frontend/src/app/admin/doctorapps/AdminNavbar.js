'use client'
import React, { useState } from 'react';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between w-100">
        <div className="title col-md-6">
        <div className="logo"></div>
        <h1>
        <a className="navbar-brand" href="/admin">
            Home
        </a>
        </h1>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className={`links&buttons collapse navbar-collapse col-md-6 align-self-end ${isMenuOpen ? 'show' : ''}`}
        >
          <ul className="navbar-nav ml-auto">
          
            <li className="nav-item">
              <a className="nav-link" href="/admin/doctors">Doctors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/patients">Patients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/admins">Admins</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/doctorapps">
                 Doctors Applications
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/healthpackages">Health Packages</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary ms-2 mx-1" href="/login">
                Logout
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
