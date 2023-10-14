"use client";
import React, { useEffect } from 'react';
import "./Login.css";
//import { Button } from './Register/Button.js';
import { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Button } from "../../../../components/Button";
import { login } from '@/app/redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';


function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {isAuthenticated, error} = useSelector(state => state.loginReducer)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=> {
    if(isAuthenticated){
      const role = JSON.parse(localStorage.getItem('userInfo')).data.user.role
      const url = role === 'administrator' ? "/admin": role === 'patient' ? "/patients/medicines": '/pharmacists/medicines';
      window.history.pushState({},url,url)
      window.location.reload()
    }
    if(error)
      window.alert("error")

  },[dispatch,isAuthenticated,error])

  const handleLogin = () => {
    // Gather data in the formData object and send it to the backend
    console.log('Form Data:', formData);
    dispatch(login(formData.email, formData.password));
   

    // Add your code to send data to the backend here
  };

  return (
    <> 
    <Navbar/> 
    <div className="containerz">
      <div className="headerz">
        <div className="textz text-primary">Login</div>
        <div className="underlinez"></div>
      </div>
      <div className="inputsz">
        <div className="inputz">
          <input
            type="Email"
            placeholder=' Username'
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
        Lost password?<span className='text-primary'> Click Here!</span>
      </div>
      <div className="submit-containerz">
        <Button
          text="Login"
          onClick={handleLogin}
        ></Button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default LoginForm;


