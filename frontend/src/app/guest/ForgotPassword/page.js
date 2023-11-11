"use client";
import React, { useEffect } from "react";

//import { Button } from './Register/Button.js';
import { useState } from "react";
import { Card } from "../../../../components/Card";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { forgetPasswordAction, login, resetPasswordAction } from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Alert } from "react-bootstrap";

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(0);
  const {success, error} = useSelector(state => state.forgetPasswordReducer)
  const {success: success2, error: error2} = useSelector(state => state.resetPasswordReducer)

  //const { isAuthenticated, error } = useSelector((state) => state.loginReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    if (counter === 0 && success !== true) {
      dispatch(forgetPasswordAction(formData))
      if(success)
        setCounter(1);
    }
    else
      dispatch(resetPasswordAction(formData))
    
  };

  return (
    <>
      <Navbar />
      <div className="container">
      {
        success2 ? (
          <Alert variant="success" dismissible className="px-2">
            <strong>Success! </strong> Please check your inbox.
          </Alert>
          ) : error2 ? (
            <Alert variant="danger" dismissible className="px-2">
              <strong>Error! </strong> {error}.
            </Alert>
          ) : success ? (
            <Alert variant="success" dismissible className="px-2">
              <strong>Success! </strong> Password Reset successfully.
            </Alert>
          ) : error ? (
            <Alert variant="danger" dismissible className="px-2">
              <strong>Error! </strong> {error2}.
            </Alert>
          ) : <></> // Add a default case or use 'null' if there's nothing to render
        }
        <div className="row gradient-background m-5 rounded shadow mx-auto">
          <div className="col-md-4 mx-auto m-5 p-5">
            <h1 className="text-bold text-light rounded">XPharmacy</h1>
            <h2 className="text-light rounded px-3">
              Convenient pharmacy at your fingertips...
            </h2>
          </div>
          <div className="col-md-5 bg-light mx-auto rounded shadow m-5 h-60 my-auto">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold mb-2">Forgot Password</h1>
              <div className="underline-sm mx-auto"></div>
            </div>
            <div className="p-4">
              {success === false && (
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control py-3"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {success === true && (
                <>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="OTP"
                    name="OTP"
                    value={formData.OTP}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      placeholder="New Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      placeholder="Confirm Password"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                    />
                  </div>
                  </>
                )}
              <div className="text-center pb-3 mt-auto">
                <Button text="Submit" onClick={handleForgotPassword} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPasswordForm;