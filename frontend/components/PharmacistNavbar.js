"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import ChangePassword from "./ChangePassword";
import { Button } from "./Button";

import { logoutAction } from '@/app/redux/actions/authActions';

const PharmacistNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goBack = () => {
    history.back();
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between w-100">
        <Modal
          show={showModal}
          size="md"
          onHide={() => setShowModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="rounded"
        >
          <Modal.Header closeButton className="bg-primary"></Modal.Header>
          <Modal.Body>
            <ChangePassword />
          </Modal.Body>
        </Modal>
        <Image
          src="/chevron.svg"
          width={20}
          height={20}
          className="mx-3 rotate-90 pt-2 pointer-cursor"
          onClick={goBack}
        ></Image>
        <div className="title col-md-6 col-sm-6">
          <div className="logo"></div>
          <h1>
            <a className="navbar-brand" href="/pharmacists/medicines">
              Home
            </a>
          </h1>
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className={`col-sm-6 links&buttons collapse navbar-collapse ms-auto col-md-2 align-self-end ${
            isMenuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto">
            <li>
              <Button
                className="col-md-8 mx-auto mt-3"
                variant="md"
                onClick={(e) => {
                  setShowModal(!showModal);
                }}
                text={"Change Password"}
              >
                {" "}
              </Button>
            </li>
            <li className="nav-item ms-auto">
              <a
                onClick={handleLogout}
                className="btn btn-primary"
                href="/guest/Login"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PharmacistNavbar;
