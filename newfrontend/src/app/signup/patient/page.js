"use client";
import { registerAction } from "@/app/redux/actions/authActions";
import { BottomCallout } from "@/components/BottomCallout";
import { Button, Card, Col, DatePicker, Grid, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../redux/validators";

const Signup = () => {
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "male",
    dateOfBirth: "",
    eName: "",
    eNumber: "",
    erelationToPatient: "",
    passwordConfirm: "",
  });
  const {
    isAuthenticated,
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
  } = useSelector((state) => state.registerReducer);
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
  let url = "";
  useEffect(() => {
    // Update overall form validity based on individual validations
    if (isAuthenticated) {
      url = "/patient/profile";
      setTimeout(() => {
        window.history.pushState({}, "", url);
        window.location.reload();
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
  const { loading, error } = useSelector((state) => state.registerReducer);

  const handleSignUp = (e) => {
    // Gather data in the formData object and send it to the backend
    e.preventDefault();
    // console.log("Form Data:", formData);
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

  const [registerCallout, setRegisterCallout] = useState(false);
  useEffect(() => {
    if (registerSuccess) {
      setRegisterCallout(true);
    }
  }, [registerSuccess]);

  const [errorCallout, setErrorCallout] = useState(false);
  useEffect(() => {
    if (registerError) {
      setErrorCallout(true);
    }
  }, [registerError]);

  return (
    <div className="flex flex-col grow flex-1 px-8">
      <Card className="grow flex-1">
        {registerSuccess && (
          // Show success message for registration
          <BottomCallout
            message="Registration successful"
            variant="success"
            visible={registerCallout}
            setVisible={setRegisterCallout}
          />
        )}
        {registerError && (
          // Show success message for registration
          <BottomCallout
            message={registerError}
            variant="error"
            visible={errorCallout}
            setVisible={setErrorCallout}
          />
        )}

        <Grid numItems={2} className="gap-x-3 gap-y-4">
          {/* Log In Form */}
          {/* Left column */}
          <>
            <Col numColSpan={2}>
              <p className="font-bold text-xl">Account Information</p>
            </Col>

            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="username"
                placeholder="Username *"
                name="username"
                value={formData.username}
                error={registerError && formData.username === ""}
                errorMesssage={
                  registerError &&
                  formData.username === "" &&
                  "Please fill in this field"
                }
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="text"
                placeholder="Email *"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={
                  (!validateEmail(formData.email) && formData.email !== "") ||
                  (formData.email === "" && registerError)
                }
                errorMessage={
                  formData.email !== ""
                    ? !validateEmail(formData.email) &&
                      formData.email !== "" &&
                      "Please enter a valid email"
                    : registerError && "Please fill in this field"
                }
              />
            </Col>
            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="password"
                placeholder="Password *"
                name="password"
                value={formData.password}
                error={
                  (!validatePassword(formData.password) &&
                    formData.password !== "") ||
                  (registerError && formData.password === "")
                }
                errorMessage={
                  formData.password !== ""
                    ? !validatePassword(formData.password) &&
                      formData.password !== "" &&
                      "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number"
                    : registerError && "Please fill in this field"
                }
                onChange={handleInputChange}
                required
              />
            </Col>
            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type={"password"}
                placeholder="Confirm Password *"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                required
                error={
                  (!passwordMatch && formData.passwordConfirm !== "") ||
                  (registerError && formData.passwordConfirm === "")
                }
                errorMessage={
                  formData !== ""
                    ? !passwordMatch &&
                      formData.passwordConfirm !== "" &&
                      "Passwords do not match"
                    : registerError && "Please fill in this field"
                }
                onChange={handlePasswordConfirmChange}
              />
            </Col>
          </>

          <>
            <Col numColSpan={2}>
              <p className="font-bold text-xl">Personal Information</p>
            </Col>

            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="text"
                placeholder="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={registerError && formData.name === ""}
                errorMessage={
                  registerError &&
                  formData.name === "" &&
                  "Please fill in this field"
                }
                required
              />
            </Col>

            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="Number"
                placeholder="Phone Number *"
                onChange={handleInputChange}
                required
                name="mobileNumber"
                value={formData.mobileNumber}
                error={
                  (formData.mobileNumber &&
                    !validatePhoneNumber(formData.mobileNumber)) ||
                  (registerError && formData.mobileNumber === "")
                }
                errorMessage={
                  formData.mobileNumber !== ""
                    ? formData.mobileNumber &&
                      !validatePhoneNumber(formData.mobileNumber) &&
                      "Please enter 11 digits sarting by a zero"
                    : registerError && "Please fill in this field"
                }
              />
            </Col>

            <Col>
              <div className="flex flex-row h-full w-full rounded-lg overflow-hidden">
                <div
                  role="button"
                  onClick={() =>
                    handleInputChange({
                      target: { name: "gender", value: "male" },
                    })
                  }
                  className={`flex items-center justify-center flex-1 h-full text-center ${
                    formData.gender === "male" ? "bg-blue-800" : "bg-gray-800"
                  }`}
                >
                  <span className="my-auto text-2xl">♂</span>
                </div>
                <div
                  role="button"
                  onClick={() =>
                    handleInputChange({
                      target: { name: "gender", value: "female" },
                    })
                  }
                  className={`flex items-center justify-center flex-1 h-full text-center ${
                    formData.gender !== "male" ? "bg-pink-500" : "bg-gray-800"
                  }`}
                >
                  <span className="my-auto text-2xl">♀</span>
                </div>
              </div>
            </Col>

            <Col>
              {/* <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="text"
                placeholder="Date of Birth (DD/MM/YY) *"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              /> */}

              <div className="relative">
                <input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  type="date"
                  required
                  className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md outline-none w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg focus:shadow-outline focus:border-blue-500"
                />
              </div>
            </Col>
          </>

          <>
            <Col numColSpan={2}>
              <p className="font-bold text-xl">Emergency Contact Information</p>
            </Col>
            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="text"
                placeholder="Emergency Contact Name *"
                name="eName"
                value={formData.eName}
                required
                error={registerError && formData.eName === ""}
                errorMessage={
                  registerError &&
                  formData.eName === "" &&
                  "Please fill in this field"
                }
                onChange={handleInputChange}
              />
            </Col>

            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="Number"
                required
                placeholder="Emergency Contact Phone *"
                name="eNumber"
                value={formData.eNumber}
                onChange={handleInputChange}
                error={
                  (formData.eNumber &&
                    !validatePhoneNumber(formData.eNumber)) ||
                  (registerError && formData.eNumber === "")
                }
                errorMessage={
                  formData.eNumber !== ""
                    ? formData.eNumber &&
                      !validatePhoneNumber(formData.eNumber) &&
                      "Please enter 11 digits sarting by a zero"
                    : registerError && "Please fill in this field"
                }
              />
            </Col>

            <Col>
              <TextInput
                className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                type="text"
                placeholder="Relation To You *"
                name="erelationToPatient"
                value={formData.erelationToPatient}
                onChange={handleInputChange}
                error={formData.erelationToPatient === "" && registerError}
                errorMessage={
                  formData.erelationToPatient === "" &&
                  registerError &&
                  "Please fill in this field"
                }
                required
              />
            </Col>

            <Button
              variant="primary"
              className="tracking-wide font-semibold text-gray-100 w-full rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              onClick={handleSignUp}
              loading={registerLoading}
              loadingText="Signing Up..."
            >
              <div className="flex flex-row items-center justify-center">
                <p className="font-bold text-white mr-2 ">Sign Up</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Button>
          </>
        </Grid>
      </Card>
    </div>
  );
};

export default Signup;
