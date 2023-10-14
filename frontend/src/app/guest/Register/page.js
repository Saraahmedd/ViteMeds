"use client";
import React from 'react';
import "./Register.css";
//import { Button } from './Register/Button.js';
import { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '@/app/redux/actions/authActions';
//import GenderDropdown from "../../../../components/DropDownmenu";
//import "./DropDown.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        gender: '',
        dateOfBirth: '',
        eName: '',
        eNumber: '',
        erelationToPatient:''
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

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.registerReducer.isLoading);
    const isAuthenticated = useSelector(state => state.registerReducer.isAuthenticated);
    const error = useSelector(state => state.registerReducer.error);

    // const {isAuthenticated, error,isLoading} = useSelector(state => state.registerReducer)

    useEffect(()=> {
        if(isAuthenticated === true){
            window.history.pushState({},"", "/patients/medicines")
            window.location.reload();
        }
        else if(error)
          window.alert("error")
    
      },[isLoading,error,isAuthenticated])

    const handleSignUp = () => {
        // Gather data in the formData object and send it to the backend
        console.log('Form Data:', formData);
        // Add your code to send data to the backend here

        dispatch(registerAction({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.password,
            role: 'patient',
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            mobileNumber: formData.mobileNumber,
            emergencyContact: {
                fullName: formData.eName,
                mobileNumber: formData.eNumber,
                relationToPatient: formData.erelationToPatient
            }
        }));
        
    };

    return (
        <>
            <Navbar />
            {!isLoading && !isAuthenticated &&
                <>
                    <div className="containerz">
                    <div className="headerz text-center">
                        <div className="textz text-primary">Sign Up</div>
                        <div className="underlinez"></div>
                        <div className="textsub text-muted"> Join us as a Patient!</div>
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
                            <div className='inputz'>
                                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="" selected disabled>Choose a gender...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="inputz">
                                <p className='ms-2 text-center'> Date of Birth</p>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <hr />
                            <h4 className='text-primary text-center'>Emergency Contact Details</h4>
                            <div className='inputz'>
                                <input
                                    type="text"
                                    placeholder=' Emergency Contact Name'
                                    name="eName"
                                    value={formData.eName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputz'>
                                <input
                                    type="tel"
                                    placeholder=' Emergency Contact Phone'
                                    name="eNumber"
                                    value={formData.eNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputz'>
                                <input
                                    type="text"
                                    placeholder=' Relation to patient'
                                    name="erelationToPatient"
                                    value={formData.erelationToPatient}
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

                </>
            }
            {
                isLoading &&
                <>
                    <h1>Loading</h1>
                </>
            }
            {
                isAuthenticated &&
                <>
                    <h1>Registration Successful</h1>
                </>
            }
            <Footer />
        </>
    );
}

export default Register;