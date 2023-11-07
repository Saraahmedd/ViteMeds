'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goBack = () => {
    history.back()
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between w-100">
      <Image src="/chevron.svg" width={20} height={20} className='mx-3 rotate-90 pt-2 pointer-cursor' onClick={goBack} ></Image>
        <div className="title col-md-6">
        <div className="logo"></div>
        <h1>
        <a className="navbar-brand" href="/patient/medicines">
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
          className={`links&buttons collapse navbar-collapse col-md-6 align-self-end ms-auto ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-auto">
              <a className="btn btn-primary" href="/guest/Login">
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
