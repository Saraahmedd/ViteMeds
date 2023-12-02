"use client";
import React, { useEffect } from "react";

//import { Button } from './Register/Button.js';
import { useState } from "react";
import { Card } from "../../../../components/Card";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import {
  forgetPasswordAction,
  login,
  resetPasswordAction,
} from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Alert, Form, Button, InputGroup } from "react-bootstrap";
import { validateEmail, validatePassword } from "../validators";

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true); // Passwords match state
  const [formValid, setFormValid] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let { success, error, loading } = useSelector(
    (state) => state.forgetPasswordReducer
  );
  const {
    success: success2,
    error: error2,
    loading: loading2,
  } = useSelector((state) => state.resetPasswordReducer);
  useEffect(() => {
    // Update overall form validity based on individual validations
    const isValid =
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      passwordMatch;

    setFormValid(isValid);
  }, [formData, passwordMatch]);
  useEffect(() => {
    if (success) {
      setCounter(1);
      setSuccessMsg("Please check your inbox.");
    } else if (error) {
      setErrorMsg(error);
      setSuccessMsg("");
    } else if (success2) {
      setTimeout(() => {
        console.log("redir");
        window.history.pushState({}, "", "/guest/login");
        window.location.reload();
      }, 3000);
      setSuccessMsg("Password reset successfully. Redirecting to login ...");
    }
    if (error2) {
      setSuccessMsg("");
      setErrorMsg("Password reset failed, Invalid OTP");
    }
  }, [dispatch, loading, loading2, error, error2, success, success2]);

  //const { isAuthenticated, error } = useSel ector((state) => state.loginReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setPasswordMatch(formData.password === formData.passwordConfirm);
  }, [formData]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    if (counter === 0 && success !== true) {
      dispatch(forgetPasswordAction(formData));
    } else {
      dispatch(resetPasswordAction(formData));
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="container">
        {
          (success2 || success) && successMsg !== "" && !error && !error2 ? (
            <Alert
              variant="success"
              dismissible
              className="px-2"
              style={{ marginLeft: "65px", width: "90%", textAlign: "center" }}
            >
              <strong>Success! </strong> {successMsg}
            </Alert>
          ) : error2 || error ? (
            <Alert
              variant="danger"
              dismissible
              className="px-2"
              style={{ marginLeft: "65px", width: "90%", textAlign: "center" }}
            >
              <strong>Error </strong>{" "}
              {errorMsg ? errorMsg : "Password reset failed, Invalid OTP"}
            </Alert>
          ) : (
            <></>
          ) // Add a default case or use 'null' if there's nothing to render
        }
        <div
          style={{ height: "650px" }}
          className="row gradient-background m-5 rounded shadow mx-auto"
        >
          <div className="col-md-4 mx-auto m-5 p-5">
            <h1 className="text-bold text-light rounded">XPharmacy</h1>
            <h2 className="text-light rounded px-3">
              Convenient pharmacy at your fingertips...
            </h2>
          </div>
          <div className="col-md-5 bg-light mx-auto rounded shadow m-5 h-60 my-auto">
            <div className="text-center mt-5">
              <h1 className="text-primary fw-bold mb-2">Forgot Password</h1>
              <div className="underline-sm mx-auto"></div>
            </div>
            <Form className="p-4">
              {success === false && (
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="e.g. example@mail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    isInvalid={formData.email && !validateEmail(formData.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              {success === true && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      name="OTP"
                      value={formData.OTP}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        isInvalid={
                          formData.password &&
                          !validatePassword(formData.password)
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 8 characters, including 1
                        uppercase letter and 1 digit.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={"password"}
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        required
                        isInvalid={
                          !passwordMatch && formData.passwordConfirm !== ""
                        }
                        onChange={handleInputChange}
                      />
                      {formData.passwordConfirm !== "" && (
                        <Form.Control.Feedback type="invalid">
                          Passwords must match.
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>
                </>
              )}

              <div className="text-center pb-3 mt-auto">
                {loading || loading2 ? (
                  <Button variant="primary" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={handleForgotPassword}
                    disabled={counter === 1 && passwordMatch === false}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPasswordForm;
