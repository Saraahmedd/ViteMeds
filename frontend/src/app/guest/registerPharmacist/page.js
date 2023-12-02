"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";
import TickAnimation from "../../../../public/tickanimation";
import Lottie from "lottie-react";
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

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    educationalBackground: "",
    affiliation: "",
    hourlyRate: "",
    dateOfbirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
    workingHours: "",
  });

  const [files, setFiles] = useState({
    document1: null,
    document2: null,
    document3: null,
  });

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfrim] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // Passwords match state
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const useEffect()
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.registerReducer
  );

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

  const handleSignUp = (E) => {
    E.preventDefault();
    const combinedFormData = new FormData();
    combinedFormData.append("username", formData.username);
    combinedFormData.append("name", formData.name);
    combinedFormData.append("email", formData.email);
    combinedFormData.append("password", formData.password);
    combinedFormData.append("passwordConfirm", formData.password);
    combinedFormData.append("dateOfBirth", formData.dateOfbirth);
    combinedFormData.append("gender", formData.gender);
    combinedFormData.append("phoneNumber", formData.phoneNumber);
    combinedFormData.append("hourlyRate", formData.hourlyRate);
    combinedFormData.append(
      "educationalBackground",
      formData.educationalBackground
    );
    combinedFormData.append("role", "pharmacist");
    combinedFormData.append("affiliation", formData.affiliation);
    combinedFormData.append("workingHours", formData.workingHours);
    combinedFormData.append("documents", files.document1);
    combinedFormData.append("documents", files.document2);
    combinedFormData.append("documents", files.document3);

    // Assuming files is an object where each property represents a file

    dispatch(registerAction(combinedFormData));
    // window.alert("Application submitted")
  };

  const handleFileUpload = (e, documentKey) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [documentKey]: file,
    }));
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="col-md-7 mx-auto rounded shadow my-5 p-5">
          <Col>
            <div className="text-center mt-3">
              <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
              <h6 className="text-global text-center mb-3">
                Join us as a Pharmacist!
              </h6>
              <div className="underline mx-auto mb-5"></div>
            </div>
            {isAuthenticated && (
              <>
                <Alert variant="success">
                  Registration Successful, Redirecting ...
                </Alert>
                {setTimeout(() => {
                  window.history.pushState({}, "", "/patients/medicines");
                  window.location.reload();
                }, 3000)}
              </>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignUp} className="p-2">
              <div className="px-4 p-3">
                <div className="personal-section">
                  <h4 className="text-global mb-1">Personal Details</h4>
                  <h6 className="text-primary mb-3 text-muted">
                    Let us know more about you.
                  </h6>

                  <Row className="row">
                    <Col className="col-md-6 mb-1">
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col className="col-md-6 mb-1">
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
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
                  <Row className="row">
                    <Col className="col-md-6 mb-1">
                      <Form.Group controlId="username">
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
                    <Col className="col-md-6 mb-1">
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
                  <Row className="mb-1">
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
                            onClick={() => togglePasswordVisibility("password")}
                          >
                            <Image
                              src={showPassword ? "/hide.svg" : "/show.svg"}
                              width={25}
                              height={25}
                            />
                          </Button>
                          <Form.Control.Feedback type="invalid">
                            Password must be at least 8 characters, including 1
                            uppercase letter and 1 digit.
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
                                showPasswordConfirm ? "/hide.svg" : "/show.svg"
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
                  <Row className="row">
                    <Col className="col-md-6 mb-1">
                      <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
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
                    <Col className="col-md-6 mb-1">
                      <Form.Group controlId="dateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfbirth"
                          value={formData.dateOfbirth}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <hr className="w-50 mx-auto mb-5" />
                <div className="proffesional-section">
                  <h4 className="text-global mb-1">Professional Details</h4>
                  <h6 className="text-primary mb-3 text-muted">
                    Let us know more about your work experience.
                  </h6>
                  <div className="p-2">
                    <div className="mb-1">
                      <Form.Group controlId="educationalBackground">
                        <Form.Label>Educational Background</Form.Label>
                        <Form.Control
                          type="text"
                          name="educationalBackground"
                          value={formData.educationalBackground}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </div>
                    <Row className="row">
                      <Col className="col-md-6 mb-1">
                        <Form.Group controlId="affiliation">
                          <Form.Label>Affiliation</Form.Label>
                          <Form.Control
                            type="text"
                            name="affiliation"
                            value={formData.affiliation}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="row">
                      <Col className="col-md-6 mb-1">
                        <Form.Group controlId="hourlyRate">
                          <Form.Label>Hourly Rate</Form.Label>
                          <Form.Control
                            type="number"
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col className="col-md-6 mb-1">
                        <Form.Group controlId="workingHours">
                          <Form.Label>Working Hours</Form.Label>
                          <Form.Control
                            type="number"
                            name="workingHours"
                            value={formData.workingHours}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className="mx-4">
                    <h4 className="text-global mb-1">Required Documents</h4>
                    <h6 className="text-primary mb-3 text-muted">
                      Please upload the following documents.
                    </h6>
                    <div className="p-2">
                      <label
                        htmlFor="document1"
                        className="d-flex align-items-center justify-content-between form-label"
                      >
                        <div className="col-lg-3">National ID </div>
                        <input
                          type="file"
                          id="document1"
                          className="form-control"
                          onChange={(e) => handleFileUpload(e, "document1")}
                        />
                      </label>
                    </div>
                    <div className="p-2">
                      <label
                        htmlFor="document2"
                        className="d-flex align-items-center justify-content-between form-label"
                      >
                        <div className="col-lg-3">Medical Degree </div>
                        <input
                          type="file"
                          id="document2"
                          className="form-control"
                          onChange={(e) => handleFileUpload(e, "document2")}
                        />
                      </label>
                    </div>
                    <div className="p-2">
                      <label
                        htmlFor="document3"
                        className="d-flex align-items-center justify-content-between form-label"
                      >
                        <div className="col-lg-3">Medical License </div>
                        <input
                          type="file"
                          id="document3"
                          className="form-control"
                          onChange={(e) => handleFileUpload(e, "document3")}
                        />
                      </label>
                    </div>
                  </div>
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
