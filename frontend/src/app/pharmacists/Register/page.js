'use client';
import React from 'react';
import './Register.css';
import { useState } from 'react';
import { Button } from "../../../../components/Button";
 import Navbar from '../../../../components/Navbar';
 import Footer from '../../../../components/Footer';
import { useDispatch } from 'react-redux';
import { registerAction } from '@/app/redux/actions/authActions';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        educationalBackground: '',
        affiliation: '',
        hourlyRate: '',
        dateOfbirth: '',
        gender: '',
        mobileNumber:'',
        speciality:'',
        workingHours:''
        
    });

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = () => {
        dispatch(registerAction({
             "username": formData.username,
            "name": formData.name,
            "email": formData.email,
            "password": formData.password,
            "passwordConfirm":formData.password,
            "dateOfBirth": formData.dateOfbirth,
            "gender": formData.gender,
            "phoneNumber": formData.mobileNumber,
            "hourlyRate": formData.hourlyRate,
            "educationalBackground": formData.educationalBackground,
            "speciality": formData.affiliation,
            "role": "pharmacist",
            "affiliation": formData.affiliation,
            "workingHours": formData.workingHours,
            }
            
            
        ));
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

                    <div className="inputz">
                        <input
                            type="date"
                            placeholder=' Date of Birth'
                            name="dateOfbirth"
                            value={formData.dateOfbirth}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="inputz">
                        <input
                            type="text"
                            placeholder='Mobile Number'
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="inputz">
                        <input
                            type="text"
                            placeholder='gender'
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="inputz">
                        <input
                            type="text"
                            placeholder='Speciality'
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="inputz">
                        <input
                            type="number"
                            placeholder='Working Hours'
                            name="workingHours"
                            value={formData.workingHours}
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
