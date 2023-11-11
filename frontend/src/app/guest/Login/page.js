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

function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, error } = useSelector((state) => state.loginReducer);

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
  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;
      const url =
        role === "administrator"
          ? "/admin"
          : role === "patient"
          ? "/patients/medicines"
          : "/pharmacists/medicines";
      window.history.pushState({}, url, url);
      window.location.reload();
    }
    if (error) window.alert("error");
  }, [dispatch, isAuthenticated, error]);

  const handleLogin = () => {
    // Gather data in the formData object and send it to the backend
    console.log("Form Data:", formData);
    dispatch(login(formData.email, formData.password));
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="row gradient-background m-5 rounded shadow mx-auto">
          <div className="col-md-4 mx-auto m-5 p-5">
            <h1 className=" text-bold text-light rounded">XPharmacy</h1>
            <h2 className=" text-light rounded px-3">
              Convenient pharmacy at your fingertips...
            </h2>
          </div>
          <div className="col-md-5 bg-light mx-auto rounded shadow m-5">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold mb-2">Login</h1>
              <div className="underline-sm mx-auto"></div>
            </div>
            <div className="p-4">
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
              <div className="mb-3 row">
                <div className="col-md-10">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control py-3"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center bg-light rounded">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="border-0 bg-light rounded"
                  >
                    <Image
                      src={showPassword ? "/hide.svg" : "/show.svg"}
                      width={35}
                      height={35}
                      alt="Toggle Password"
                    />
                  </button>
                </div>
              </div>
              <a href ="http://localhost:3000/guest/ForgotPassword">
                Forgot Password 
              </a>
              <div className="text-center pb-3">
                <Button text="Login" onClick={handleLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginForm;
