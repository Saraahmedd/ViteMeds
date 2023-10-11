'use client';
import React from 'react';
import './Register.css';
import { useState } from 'react';
import { Button } from "../../../../components/Button";
 import Navbar from '../../../../components/Navbar';
 import Footer from '../../../../components/Footer';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        educationalBackground: '',
        affiliation: '',
        hourlyRate: ''
    });

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
             <Navbar /> 
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
                            placeholder=' Name'
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
                            type="text"
                            placeholder=' Educational Background'
                            name="educationalBackground"
                            value={formData.educationalBackground}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="text"
                            placeholder=' Affiliation'
                            name="affiliation"
                            value={formData.affiliation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="inputz">
                        <input
                            type="text"
                            placeholder=' Hourly Rate'
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="submit-containerz">
                    <Button
                        text="Sign Up"
                        onClick={handleSignUp}
                    ></Button>
                </div>
            </div>
             <Footer /> 
        </>
    );
}

export default SignUp;
