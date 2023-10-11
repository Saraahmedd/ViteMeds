"use client";
import React from 'react';
import "./Login.css";
//import { Button } from './Register/Button.js';
import { useState } from 'react';
//import Navbar from '../../../../components/Navbar';
//import Footer from '../../../../components/Footer';
import { Button } from "../../../../components/Button";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = () => {
    // Gather data in the formData object and send it to the backend
    console.log('Form Data:', formData);
    // Add your code to send data to the backend here
  };

  return (
    <> 
    {/* <Navbar/>  */}
    <div className="containerz">
      <div className="headerz">
        <div className="textz">Login</div>
        <div className="underlinez"></div>
      </div>
      <div className="inputsz">
        <div className="inputz">
          <input
            type="Email"
            placeholder=' Email'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputz">
          <input
            type="Password"
            placeholder=' Password'
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="forgot-passwordz">
        Lost password?<span> Click Here!</span>
      </div>
      <div className="submit-containerz">
        <Button
          text="Login"
          onClick={handleLogin}
        ></Button>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default LoginForm;


