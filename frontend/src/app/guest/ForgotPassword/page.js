"use client";
import React, { useEffect } from "react";

//import { Button } from './Register/Button.js';
import { useState } from "react";
import { Card } from "../../../../components/Card";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { login } from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(0);

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
    // Handle the Forgot Password logic based on the counter
    if (counter === 0) {
      // handle email submission
      setCounter(1);
    } else if (counter === 1) {
      // handle OTP submission
      setCounter(2);
    } else if (counter === 2) {
      // handle new password and confirm password submission
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row gradient-background m-5 rounded shadow mx-auto">
          <div className="col-md-4 mx-auto m-5 p-5">
            <h1 className="text-bold text-light rounded">XPharmacy</h1>
            <h2 className="text-light rounded px-3">
              Convenient pharmacy at your fingertips...
            </h2>
          </div>
          <div className="col-md-5 bg-light mx-auto rounded shadow m-5">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold mb-2">Forgot Password</h1>
              <div className="underline-sm mx-auto"></div>
            </div>
            <div className="p-4">
              {counter === 0 && (
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
              {counter === 1 && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="OTP"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {counter === 2 && (
                <>
                  <div className="mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      placeholder="New Password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control py-3"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div className="text-center pb-3">
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