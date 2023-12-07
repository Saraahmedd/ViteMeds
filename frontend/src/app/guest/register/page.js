"use client";
import React from "react";
import "./Register.css";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../validators";

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
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    // Update overall form validity based on individual validations
    const isValid =
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.mobileNumber) &&
      validatePassword(formData.password) &&
      passwordMatch;

    setFormValid(isValid);
  }, [formData, passwordMatch]);

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
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.registerReducer
  );

  const handleSignUp = (e) => {
    // Gather data in the formData object and send it to the backend
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your code to send data to the backend here

    dispatch(
      registerAction({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        role: "patient",
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        emergencyContact: {
          fullName: formData.eName,
          mobileNumber: formData.eNumber,
          relationToPatient: formData.erelationToPatient,
        },
      })
    );
  };

  return (
    <>
      <Navbar />
      {
        <Container className="mt-5">
          <Row className="col-md-7 mx-auto rounded shadow my-5 p-5">
            <Col>
              <div className="text-center mt-3">
                <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
                <h6 className="text-global text-center mb-3">
                  Join us as a Patient!
                </h6>
                <div className="underline mx-auto mb-5"></div>
              </div>
              <br />
              {isAuthenticated && (
                <>
                  <Alert variant="success">
                    Registration Successful, Redirecting ...
                  </Alert>
                  {setTimeout(() => {
                    window.history.pushState({}, "", "/patients/medicines");
                    window.location.reload();
                  }, 5000)}
                </>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="d-flex p-3">
                <Col>
                  <h4 className="text-global mb-1">Personal Details</h4>
                  <h6 className="text-primary mb-4 text-muted">
                    Let us know more about you.
                  </h6>

                  <Form onSubmit={handleSignUp}>
                    <div className="personal-section px-2">
                      <Row className="py-2">
                        <Col md={6}>
                          <Form.Group className="mb-1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="e.g. John Doe"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="e.g. example@mail.com"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required={true}
                              isInvalid={
                                formData.email && !validateEmail(formData.email)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid email address.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <div className="mb-1 position-relative d-flex align-items-center">
                              <span className="px-2 position-absolute start-0 text-global fw-bold">
                                (+20)
                              </span>
                              <Form.Control
                                type="Number"
                                className="pl-5 form-control py-2"
                                style={{ paddingLeft: "60px" }}
                                placeholder="01234567890"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                required
                                isInvalid={
                                  formData.mobileNumber &&
                                  !validatePhoneNumber(formData.mobileNumber)
                                }
                              />
                            </div>
                            <Form.Control.Feedback
                              type="invalid"
                              style={{ marginTop: "5px" }} // Adjust margin-top as needed
                            >
                              Please enter a valid phone number (10 digits).
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handlePasswordConfirmChange}
                                required
                                isInvalid={
                                  formData.password &&
                                  !validatePassword(formData.password)
                                }
                              />

                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  togglePasswordVisibility("password")
                                }
                              >
                                <Image
                                  src={showPassword ? "/hide.svg" : "/show.svg"}
                                  width={25}
                                  height={25}
                                />
                              </Button>
                              <Form.Control.Feedback type="invalid">
                                Password must be at least 8 characters,
                                including 1 uppercase letter and 1 digit.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-1">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPasswordConfirm ? "text" : "password"}
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                required
                                isInvalid={!passwordMatch}
                                onChange={handlePasswordConfirmChange}
                              />

                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  togglePasswordVisibility("passwordConfirm")
                                }
                              >
                                <Image
                                  src={
                                    showPasswordConfirm
                                      ? "/hide.svg"
                                      : "/show.svg"
                                  }
                                  width={25}
                                  height={25}
                                />
                              </Button>
                              <Form.Control.Feedback type="invalid">
                                Passwords do not match.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="py-2">
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              className="py-2"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" disabled>
                                Select...
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              required
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                    <hr className="w-50 mx-auto mb-5" />
                    <div className="mx-2">
                      <h4 className="text-global">Emergency Contact Details</h4>
                      <h6 className="text-primary mb-4 text-muted">
                        We will contact this person in case of any emergencies.
                      </h6>
                      <div className="row px-2">
                        <Row className="py-2">
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Emergency Contact Name"
                                name="eName"
                                value={formData.eName}
                                required
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Emergency Contact Phone Number
                              </Form.Label>
                              <div className="mb-1 position-relative d-flex align-items-center">
                                <span className="px-2 position-absolute start-0 text-global fw-bold">
                                  (+20)
                                </span>
                                <Form.Control
                                  type="Number"
                                  required
                                  className="pl-5 form-control py-2"
                                  style={{ paddingLeft: "60px" }}
                                  placeholder="Emergency Contact Phone"
                                  name="eNumber"
                                  value={formData.eNumber}
                                  onChange={handleInputChange}
                                  isInvalid={
                                    formData.eNumber &&
                                    !validatePhoneNumber(formData.eNumber)
                                  }
                                />
                              </div>
                              <Form.Control.Feedback type="invalid">
                                Please enter a valid phone number (10 digits).
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="py-2">
                          <Col lg={6} md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Relation to Patient</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="i.e. brother"
                                name="erelationToPatient"
                                value={formData.erelationToPatient}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="text-center">
                      {loading ? (
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
                          disabled={!formValid}
                          // onClick={handleSignUp}
                        >
                          Sign Up
                        </Button>
                      )}
                    </div>
                  </Form>
                  <br />
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      }

      <Footer />
    </>
  );
};

export default Register;
