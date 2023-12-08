"use client"
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import pharmacyanimation from '../../../../public/pharmacy.json'
import Lottie from "lottie-react";
import { login } from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {useRouter} from "next/router";
import { redirect } from "next/navigation";
const Login = () => {
// const Router = useRouter()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.loginReducer
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let url=""
  useEffect(() => {
    if (isAuthenticated) {
      const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;
      url =
        role === "administrator"
          ? "/admin"
          : role === "patient"
          ? "/patient/cart"
          : "/patient/cart";
          console.log(url)
      setTimeout(() => {
        window.history.pushState({},"",url)
        window.location.reload()
      }, 1000);
    }
  }, [dispatch, isAuthenticated, error]);

  const handleLogin = () => {
    dispatch(login(formData.username, formData.password));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center rounded-lg border border-purple-600 px-4 pt-8 pb-10 shadow-lg w-full">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Log In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                {/* Log In Form */}
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400"
                  type="username"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required

                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required

                />
                <button className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={handleLogin}>
                  <span className="ml-3">Log In</span>
                </button>
                
                {/* Forgot Password Link */}
                <div className="mt-2 text-sm text-gray-500 text-center">
                  <a href="#" className="hover:text-white">Forgot Password?</a>
                </div>
                         {/* Partition */}
          <div className="flex items-center mt-4">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
          
          {/* Sign Up Button */}
          <button className="mt-4 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            <span className="ml-3">Sign Up</span>
          </button>
              </div>
            </div>
          </div>
          
 
        </div>
        
        {/* GIF to the Right */}
       
        <Lottie animationData={pharmacyanimation} className='w-[550px] h-[550px]' loop={true} />
        
      </div>
    </div>
  );
};

export default Login;
