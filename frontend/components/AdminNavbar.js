'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logoutAction } from '@/app/redux/actions/authActions';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goBack = () => {
    history.back()
  }

  const handleLogout = ()=> {
    dispatch(logoutAction())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between w-100">
      <Image src="/chevron.svg" width={20} height={20} className='mx-3 rotate-90 pt-2 pointer-cursor' onClick={goBack} ></Image>
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
              <a className="nav-link" href="/admin/admins">Admins</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/pharmacists">Pharmacists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/pharmacistapps">
                 Applications
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/patients">Patients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin/medicines">Medicines</a>
            </li>
            <li className="nav-item">
              <a onClick={handleLogout} className="btn btn-primary ms-2 mx-1" href="/guest/Login">
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
