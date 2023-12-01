"use client";
import React from "react";
import "./Register.css";
//import { Button } from './Register/Button.js';
import { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";
//import GenderDropdown from "../../../../components/DropDownmenu";
//import "./DropDown.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    eName: "",
    eNumber: "",
    erelationToPatient: "",
  });

  const handleGenderChange = (selectedGender) => {
    setFormData({
      ...formData,
      gender: selectedGender,
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.registerReducer.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.registerReducer.isAuthenticated,
  );
  const error = useSelector((state) => state.registerReducer.error);

  // const {isAuthenticated, error,isLoading} = useSelector(state => state.registerReducer)

  useEffect(() => {
    if (isAuthenticated === true) {
      window.history.pushState({}, "", "/patients/medicines");
      window.location.reload();
    } else if (error) window.alert("error");
  }, [isLoading, error, isAuthenticated]);

  const handleSignUp = () => {
    // Gather data in the formData object and send it to the backend
    console.log("Form Data:", formData);
    // Add your code to send data to the backend here

    dispatch(
      registerAction({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.password,
        role: "patient",
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        emergencyContact: {
          fullName: formData.eName,
          mobileNumber: formData.eNumber,
          relationToPatient: formData.erelationToPatient,
        },
      }),
    );
  };

  return (
    <>
      <Navbar />
      {!isLoading && !isAuthenticated && (
        <>
          <div className="container mt-5">
            <div className="row col-md-7 mx-auto rounded shadow my-5 p-5">
              <div className="text-center mt-3">
                <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
                <h6 className="text-global text-center mb-3">
                  Join us as a Patient!
                </h6>
                <div className="underline mx-auto mb-5"></div>
              </div>
              <br />
              <div className="d-flex p-3">
                <div className="col mx-2">
                  <h4 className="text-global mb-1">Personal Details</h4>
                  <h6 className="text-primary mb-4 text-muted">
                    Let us know more about you.
                  </h6>
                  <div className="personal-section px-2">
                    <div className="row">
                      <div className=" col-md-6 mb-1">
                        <label
                          htmlFor="name"
                          className="text-semibold form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label
                          htmlFor="email"
                          className="text-semibold form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control py-2"
                          placeholder="example@mail.com"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-1">
                        <label
                          htmlFor="username"
                          className="text-semibold form-label"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-1">
                        <label
                          htmlFor="password"
                          className="text-semibold form-label"
                        >
                          Password
                        </label>
                        <div className="row">
                          <div className="col-md-10">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control py-2"
                              placeholder="********"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-center bg-white rounded">
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("password")
                              }
                              className="border-0  bg-white rounded"
                            >
                              <Image
                                src={showPassword ? "/hide.svg" : "/show.svg"}
                                width={25}
                                height={25}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-semibold form-label"
                      >
                        Phone Number
                      </label>
                      <div className="mb-1 position-relative d-flex align-items-center">
                        <span className="px-2 position-absolute start-0 text-global fw-bold">
                          (+2)
                        </span>
                        <input
                          type="tel"
                          className="pl-5 form-control py-2"
                          style={{ paddingLeft: "50px" }}
                          placeholder="01234567890"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="phone"
                          className="text-semibold form-label"
                        >
                          Gender
                        </label>
                        <select
                          className="form-select py-2"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="phone"
                          className="text-semibold form-label"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control py-2"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="w-50 mx-auto mb-5" />

                  <div className="mx-2">
                    <h4 className="text-global">Emergency Contact Details</h4>
                    <h6 className="text-primary mb-4 text-muted">
                      We will contact this person in case of any emergenices.
                    </h6>
                    <div className="row px-2">
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="name"
                          className="text-semibold form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="Emergency Contact Name"
                          name="eName"
                          value={formData.eName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="phone"
                          className="text-semibold form-label"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control py-2"
                          placeholder="Emergency Contact Phone"
                          name="eNumber"
                          value={formData.eNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="relationToPatient"
                          className="text-semibold form-label"
                        >
                          Relation to patient
                        </label>
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="i.e. brother"
                          name="erelationToPatient"
                          value={formData.erelationToPatient}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <div className="text-center">
                <Button text="Sign Up" onClick={handleSignUp} />
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading && <h1>Loading</h1>}
      {isAuthenticated && <h1>Registration Successful</h1>}
      <Footer />
    </>
  );
};

export default Register;
