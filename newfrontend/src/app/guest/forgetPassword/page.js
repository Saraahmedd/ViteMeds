"use client"
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import pharmacyanimation from '../../../../public/animationlogin.json'
import Lottie from "lottie-react";
import { forgetPasswordAction, login, resetPasswordAction } from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { Button, Card, Grid, TextInput } from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
import { validateEmail, validateOTP, validatePassword } from "@/app/redux/validators";
const forgetPassword = () => {
  const [counter, setCounter] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true);
  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordMatch(
      formData.password === confirmPassword ||
      formData.passwordConfirm === confirmPassword
    );
    handleInputChange(e);
  };

  const [visibleFeedback, setVisibleFeedback] = useState(false);
  // const Router = useRouter()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
    password: "",
    passwordConfirm: "",
  });
  const { success: forgetSuccess, error: forgetError, loading: forgetLoading } = useSelector(
    (state) => state.forgetPasswordReducer
  );
  const { success: resetSuccess, error: resetError, loading: resetLoading } = useSelector
    ((state) => state.resetPasswordReducer);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let url = ""
  useEffect(() => {
    if (forgetSuccess)
      setCounter(1)
    if (resetSuccess) {

      url = "/guest/login"
      console.log(url)
      setTimeout(() => {
        window.history.pushState({}, "", url)
        window.location.reload()
      }, 1000);
    }
  }, [dispatch, forgetSuccess, resetSuccess]);

  const handleSendOTP = () => {
    dispatch(forgetPasswordAction(formData));

  };
  const handleResetPass = () => {
    dispatch(resetPasswordAction(formData));
  }


  return (
    <>
      <div className="flex flex-col grow flex-1 px-8">
        <Card className="grow flex-1 gap-24 flex items-center justify-center mb-6">
          <Lottie animationData={pharmacyanimation} className='w-[550px] h-[550px]' loop={true} />
          <div className="flex flex-col rounded-lg w-[550px]">
            {counter === 0 && <h1 className="text-2xl xl:text-xl font-extrabold">Enter your Email</h1>}
            {counter === 1 && <h1 className="text-2xl xl:text-xl font-extrabold">Reset Password</h1>}
            <div className="mt-2">
              {/* Log In Form */}
              {counter === 0 &&
                <>
                  {
                    forgetSuccess && <BottomCallout
                      message="OTP Sent Successfully"
                      variant="success"
                      visible={true}
                      setVisible={setVisibleFeedback}
                    />
                  }
                  <Grid numItems={1} className="gap-x-3 gap-y-4">


                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="email"
                      placeholder="example@mail.com"
                      icon={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      )}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      error={(
                        !validateEmail(formData.email) && formData.email !== "")
                        || (formData.email === "" && forgetError)
                      }
                      errorMessage={
                        !validateEmail(formData.email) &&
                        formData.email !== "" &&
                        "Please enter a valid email"
                      }


                    />

                  </Grid>
                  <Button className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSendOTP}
                    loading={forgetLoading}
                    variant="primary"
                    loadingText="Sending OTP...">
                    <span className="text-white">Send OTP</span>
                  </Button>
                </>

              }

              {counter === 1 &&
                <>
                  {
                    resetSuccess && <BottomCallout
                      message="Password Reset Successfully"
                      variant="success"
                      visible={true}
                      setVisible={setVisibleFeedback}
                    />
                  }
                  <Grid numItems={1} className="gap-x-3 gap-y-4">


                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="email"
                      placeholder="OTP (6-digit code)"
                      name="OTP"
                      value={formData.OTP}
                      onChange={handleInputChange}
                      required
                      error={
                        (!validateOTP(formData.OTP) && formData.OTP !== "")
                        || (resetError && formData.OTP === "")

                      }
                      errorMessage={
                        !validateOTP(formData.OTP) &&
                        formData.OTP !== "" &&
                        "Please enter a valid OTP 6-digit code"
                      }


                    />
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      error={(!validatePassword(formData.password) && formData.password !== "")
                        || (resetError && formData.password === "")}
                      errorMessage={

                        (!validatePassword(formData.password) &&
                          formData.password !== "") &&
                        "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number"}




                    />
                    <TextInput
                      className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                      type="password"
                      placeholder="Confirm Password"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      error={(!passwordMatch && formData.passwordConfirm !== "")
                        || (resetError && formData.passwordConfirm === "")
                      }
                      errorMessage={

                        !passwordMatch &&
                        formData.passwordConfirm !== "" &&
                        "Passwords do not match"
                      }
                      onChange={handlePasswordConfirmChange}


                    />

                  </Grid>
                  <Button className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleResetPass}
                    loading={resetLoading}
                    variant="primary"
                    loadingText="Resetting Password...">
                    <span className="ml-3">Reset Password</span>
                  </Button>
                </>

              }

            </div>
          </div>
        </Card>
      </div>
    </>



  );
};

export default forgetPassword;
