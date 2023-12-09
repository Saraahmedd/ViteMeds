"use client"
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import pharmacyanimation from '../../../../public/pharmacy.json'
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { Button, Col, DatePicker, Grid, TextInput } from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../redux/validators";
import { Divider } from "@tremor/react";
import { FileUpload } from "@/components/FileUpload";

const SignupPharmacist = () => {
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    educationalBackground: "",
    affiliation: "",
    hourlyRate: "",
    dateOfBirth: "",
    gender: "male",
    mobileNumber: "",
    passwordConfirm: ""
  });
  
  const {
    isAuthenticated,
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
  } = useSelector(
    (state) => state.registerReducer
  );
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState({
    document1: null,
    document2: null,
    document3: null,
  });
  const setDocument1 = (file) => {
    
    setFiles({document1:file,...files})
    
  }
  const setDocument2 = (file) => {
    setFiles({...files,document2:file})
  }
  const setDocument3 = (file) => {
    setFiles({...files,document3:file})
  }
  const [showPasswordConfirm, setShowPasswordConfrim] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // Passwords match state
  const [formValid, setFormValid] = useState(false);

  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordMatch(
      formData.password === confirmPassword ||
      formData.passwordConfirm === confirmPassword
    );
    handleInputChange(e);
  };
  let url=""
  useEffect(() => {
    // Update overall form validity based on individual validations
    //e.preventDefault();
  
   if(isAuthenticated)
   { 
    url="/pharmacist/profile";
    setTimeout(() => {
      window.history.pushState({},"",url)
      window.location.reload()
    }, 1000);

}
  }, [registerLoading]);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowPasswordConfrim(!showPasswordConfirm);
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
  const { loading,  error } = useSelector(
    (state) => state.registerReducer
  );


  const handleSignUp = (e) => {
    // Gather data in the formData object and send it to the backend
    e.preventDefault();
    const combinedFormData = new FormData();
    combinedFormData.append("username", formData.username);
    combinedFormData.append("name", formData.name);
    combinedFormData.append("email", formData.email);
    combinedFormData.append("password", formData.password);
    combinedFormData.append("passwordConfirm", formData.passwordConfirm);
    combinedFormData.append("dateOfBirth", formData.dateOfBirth);
    combinedFormData.append("gender", formData.gender);
    combinedFormData.append("phoneNumber", formData.phoneNumber);
    combinedFormData.append("hourlyRate", formData.hourlyRate);
    combinedFormData.append(
      "educationalBackground",
      formData.educationalBackground
    );
    combinedFormData.append("role", "pharmacist");
    combinedFormData.append("affiliation", formData.affiliation);
    combinedFormData.append("documents", files.document1);
    combinedFormData.append("documents", files.document2);
    combinedFormData.append("documents", files.document3);
    // Add your code to send data to the backend here

    dispatch(
      registerAction(
        combinedFormData)
    );
  };

  return ( <>
    {registerSuccess && (
      // Show success message for registration
      <BottomCallout
        message="Registration successful"
        variant="success"
        visible={true}
        setVisible={setVisibleFeedback}
      />
    )}
    {registerError && (
      // Show success message for registration
      <BottomCallout
      
        message="Please fill in the required fields correctly"
        variant="error"
        visible={true}
        setVisible={setVisibleFeedback}
      />
    )}
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">
    <Lottie animationData={pharmacyanimation} className='w-[550px] h-[900]' loop={true} />
        <div className="lg:w-2/3 xl:w-2/3 p-6 sm:p-12 transform scale-70">
          <div className="flex flex-col items-center rounded-lg border border-primary-600 px-8 pt-8 pb-12 shadow-lg w-full ">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-l">

                <Grid numItems={2} className="gap-x-3 gap-y-4">
                  {/* Log In Form */}
                  {/* Left column */}
                  <Col numColSpan={2}>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Enter name*"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={registerError&& formData.name===""}
                      errorMessage={registerError&& formData.name==="" && "Please fill in this field"}
                      required
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Email*"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      error={(
                        !validateEmail(formData.email) && formData.email !== "")
                        || (formData.email === "" && registerError)
                      }
                      errorMessage={formData.email !== "" ?
                        (
                        !validateEmail(formData.email) &&
                        formData.email !== "" &&
                        "Please enter a valid email"):(registerError&&
                          "Please fill in this field")
                      }
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="username"
                      placeholder="Username*"
                      name="username"
                      value={formData.username}
                      error={registerError && formData.username===""}
                      errorMesssage={registerError && formData.username==="" && "Please fill in this field"}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="password"
                      placeholder="Password*"
                      name="password"
                      value={formData.password }
                      error={(!validatePassword(formData.password)&& formData.password!=="")
                    || (registerError && formData.password==="")}
                      errorMessage={
                        formData.password!=="" ? (
                        !validatePassword(formData.password) &&
                        formData.password !== "" &&
                        "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number"):(
                          registerError && "Please fill in this field"
                        )}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type={"password"}
                      placeholder="Confirm Password*"
                      name="passwordConfirm"
                      value={formData.passwordConfirm }
                      required
                      error={(!passwordMatch && formData.passwordConfirm!=="")
                      || (registerError && formData.passwordConfirm==="")
                  }
                      errorMessage={
                        formData !=="" ? (
                        !passwordMatch &&
                        formData.passwordConfirm !== "" &&
                        "Passwords do not match")
                      :(
                        registerError && "Please fill in this field"
                      )}
                      onChange={handlePasswordConfirmChange}
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="Number"
                      placeholder="Phone Number*"
                      onChange={handleInputChange}
                      required
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      error={(
                        formData.mobileNumber &&
                        !validatePhoneNumber(formData.mobileNumber))
                        || (registerError && formData.mobileNumber==="")
                      }
                      errorMessage={
                        formData.mobileNumber!=="" ? (
                        formData.mobileNumber &&
                        !validatePhoneNumber(formData.mobileNumber)&&
                      "Please enter 11 digits sarting by a zero") :(
                        registerError && "Please fill in this field"
                      )}
                    />
                  </Col>

                  {/* Right column */}
                  {/* 3ayza aghayar el gender aslan akhalih icons lessa fa ma7atetsh code el integration  */}
                  
                  <Col>
                    {/* <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    /> */}
                    <div className="flex flex-row h-full w-full rounded-lg">
                      <div role="button" onClick={() => handleInputChange({ target: { name: 'gender', value: 'male' } })} className={`flex items-center justify-center flex-1 h-full text-center ${formData.gender === 'male' ? 'bg-blue-800' : 'bg-gray-800'}`}>
                      <span className="my-auto text-2xl">♂</span>
                      </div>
                      <div role="button" onClick={() => handleInputChange({ target: { name: 'gender', value: 'female' } })} className={`flex items-center justify-center flex-1 h-full text-center ${formData.gender !== 'male' ? 'bg-pink-500' : 'bg-gray-800'}`}>
                        <span className="my-auto text-2xl">♀</span>
                      </div>
                    </div>
                  </Col>


                  {/* <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-lg"></p> */}
                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="DD/MM/YY*"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Affiliation*"
                      name="affiliation"
                      value={formData.affiliation}
                      required
                      error={registerError&& formData.affiliation===""}
                      errorMessage={registerError&& formData.affiliation==="" && "Please fill in this field"}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Educational Background*"
                      name="educationalBackground"
                      value={formData.educationalBackground}
                      onChange={handleInputChange}
                      error={formData.educationalBackground==="" && registerError}
                      errorMessage={formData.educationalBackground==="" && registerError && "Please fill in this field"}
                      required
                    />
                  </Col>

                  <Col>
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="text"
                      placeholder="Hourly Rate*"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      error={formData.hourlyRate==="" && registerError}
                      errorMessage={formData.hourlyRate==="" && registerError && "Please fill in this field"}
                      required
                    />
                  </Col>
                </Grid>
               
                <Divider></Divider>
                <h1 className="text-2xl xl:text-3xl font-extrabold text-center">Required Documents</h1>
                <FileUpload variant="secondary" buttonText="Upload ID" callBackFiles={setDocument1}></FileUpload>

                <FileUpload variant="secondary" buttonText="Upload Pharmacy Degree" callBackFiles={setDocument2}></FileUpload>

                <FileUpload variant="secondary" buttonText="Upload Working License" callBackFiles={setDocument3}></FileUpload>
                
                {/* Sign Up Button */}
                <Button variant="primary" className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleSignUp}
                  loading = {registerLoading}
                  loadingText="Signing Up...">
                  <span className="ml-3 text-white">Sign Up</span>
                </Button>
              </div>
            </div>
          </div>


        </div>

        {/* GIF to the Right */}



        {/* {loginError && (
        <BottomCallout
          message="Invalid Username or Password"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )} */}

      </div >
    </div >
    </>
  );
};

export default SignupPharmacist;
