"use client";
import { registerAction } from "@/app/redux/actions/authActions";
import { BottomCallout } from "@/components/BottomCallout";
import { FileUpload } from "@/components/FileUpload";
import { Button, Card, Col, Divider, Grid, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pharmacyanimation from "../../../../public/animationlogin.json";
import Lottie from "lottie-react";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../redux/validators";

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
    phoneNumber: "",
    passwordConfirm: "",
  });

  const {
    isAuthenticated,
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
  } = useSelector((state) => state.registerReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState({
    document1: null,
    document2: null,
    document3: null,
  });
  const setDocument1 = (file) => {
    setFiles({ ...files, document1: file });
  };
  const setDocument2 = (file) => {
    setFiles({ ...files, document2: file });
  };
  const setDocument3 = (file) => {
    setFiles({ ...files, document3: file });
  };
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
    if (isAuthenticated) {
      url = "/pharmacistWaiting";
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

    dispatch(registerAction(combinedFormData));
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
    <>
      {registerSuccess && (
        <BottomCallout
          message="Registration successful"
          variant="success"
          visible={registerCallout}
          setVisible={setRegisterCallout}
        />
      )}
      {registerError && (
        <BottomCallout
          message="Please fill in the required fields correctly"
          variant="error"
          visible={errorCallout}
          setVisible={setErrorCallout}
        />
      )}
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 mx-auto">
          <Lottie
            animationData={pharmacyanimation}
            className="w-[620px] h-[750px]"
            loop={true}
          />
        </div>
        <div className="flex flex-col grow flex-1 p-10 ">
          <Card className="grow flex-1 border border-gray-700">
            <p className="font-bold text-3xl text-center py-5 pb-3">Sign Up</p>
            <hr className="pb-5" />
            <Grid numItems={2} className="gap-x-3 gap-y-4">
              <>
                <Col numColSpan={2}>
                  <p className="font-semibold mt-4 text-xl">
                    Account Information
                  </p>
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
                      (!validateEmail(formData.email) &&
                        formData.email !== "") ||
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
                  <p className="font-semibold text-xl mt-4">
                    Personal Information
                  </p>
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    error={
                      (formData.phoneNumber &&
                        !validatePhoneNumber(formData.phoneNumber)) ||
                      (registerError && formData.phoneNumber === "")
                    }
                    errorMessage={
                      formData.phoneNumber !== ""
                        ? formData.phoneNumber &&
                          !validatePhoneNumber(formData.phoneNumber) &&
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
                        formData.gender === "male"
                          ? "bg-blue-800"
                          : "bg-gray-800"
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
                        formData.gender !== "male"
                          ? "bg-pink-500"
                          : "bg-gray-800"
                      }`}
                    >
                      <span className="my-auto text-2xl">♀</span>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className="relative bg-gray-800">
                    <input
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      type="date"
                      required
                      className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md outline-none w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg focus:shadow-outline focus:border-blue-500"
                      // Add other date picker props and event handlers as needed
                    />
                  </div>
                </Col>
              </>

              <>
                <Col numColSpan={2}>
                  <p className="font-semibold text-xl mt-4">Work Information</p>
                </Col>

                <Col>
                  <TextInput
                    className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                    type="text"
                    placeholder="Affiliation *"
                    name="affiliation"
                    value={formData.affiliation}
                    required
                    error={registerError && formData.affiliation === ""}
                    errorMessage={
                      registerError &&
                      formData.affiliation === "" &&
                      "Please fill in this field"
                    }
                    onChange={handleInputChange}
                  />
                </Col>

                <Col>
                  <TextInput
                    className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                    type="text"
                    placeholder="Educational Background *"
                    name="educationalBackground"
                    value={formData.educationalBackground}
                    onChange={handleInputChange}
                    error={
                      formData.educationalBackground === "" && registerError
                    }
                    errorMessage={
                      formData.educationalBackground === "" &&
                      registerError &&
                      "Please fill in this field"
                    }
                    required
                  />
                </Col>

                <Col>
                  <TextInput
                    className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                    type="text"
                    placeholder="Hourly Rate *"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    error={formData.hourlyRate === "" && registerError}
                    errorMessage={
                      formData.hourlyRate === "" &&
                      registerError &&
                      "Please fill in this field"
                    }
                    required
                  />
                </Col>
              </>
              <>
                <Col numColSpan={2}>
                  <p className="font-semibold text-xl mt-4">
                    Required Documents (JPEG, PNG , PDF)
                  </p>
                </Col>

                <Col>
                  <FileUpload
                    variant="secondary"
                    buttonText="Upload ID"
                    callBackFiles={setDocument1}
                  ></FileUpload>
                </Col>

                <Col className="flex">
                  <div className="w-[0px] overflow-hidden">
                    <TextInput className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  " />
                  </div>

                  <FileUpload
                    variant="secondary"
                    buttonText="Upload Pharmacy Degree"
                    callBackFiles={setDocument2}
                  ></FileUpload>
                </Col>

                <Col className="flex">
                  <div className="w-[0px] overflow-hidden">
                    <TextInput className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  " />
                  </div>

                  <FileUpload
                    variant="secondary"
                    buttonText="Upload Working License"
                    callBackFiles={setDocument3}
                  ></FileUpload>
                </Col>

                <Col>
                  <Button
                    disabled={
                      files.document1 === null ||
                      files.document2 === null ||
                      files.document3 === null
                    }
                    variant="primary"
                    className="h-full tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSignUp}
                    loading={registerLoading}
                    loadingText="Signing Up..."
                  >
                    <div className="flex flex-row items-center justify-center">
                      <p className="font-semibold text-md text-white mr-2 ">
                        Apply Now
                      </p>
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
                </Col>
              </>
            </Grid>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPharmacist;
