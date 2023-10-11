"use client";
import React from 'react';
import "./Register.css";
//import { Button } from './Register/Button.js';
import { useState } from 'react';
//import Navbar from '../../../../components/Navbar';
//import Footer from '../../../../components/Footer';
import { Button } from "../../../../components/Button";
//import GenderDropdown from "../../../../components/DropDownmenu";
//import "./DropDown.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        gender:'',
    });

    const handleGenderChange = (selectedGender) => {
        setFormData({
            ...formData,
            gender: selectedGender
        });
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = () => {
        // Gather data in the formData object and send it to the backend
        console.log('Form Data:', formData);
        // Add your code to send data to the backend here
    };
    

    const [action] = useState("Sign up");

    return (
        <>
            {/* <Navbar /> */}
            <div className="containerz">
                <div className="headerz">
                    <div className="textz">{action}</div>
                    <div className="underlinez"></div>
                </div>
                <div className="inputsz">
                    <div className="inputz">
                        <input
                            type="text"
                            placeholder=' Username'
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="text"
                            placeholder='Name'
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="email"
                            placeholder=' Email'
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="password"
                            placeholder=' Password'
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="tel"
                            placeholder=' Mobile Number'
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <div>
      <h1>Gender Selection</h1>
      <GenderDropdown />
    </div> */}
                </div>
       <div className="submit-containerz">
                    <Button
                        text="Sign Up"
                        onClick={handleSignUp}
                    ></Button>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Register;
