import React, { useState } from "react";
import { Button } from "components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = () => {
    // handle sending the email and displaying the OTP field
    setShowOTP(true);
  };

  const handleOTPSubmit = () => {
    // handle OTP verification and display new password fields
    setNewPassword(true);
    setConfirmPassword(true);
  };

  const handleNewPasswordSubmit = () => {
    // handle updating the password in the backend
  };

  return (
    <div className="forgot-password-container">
      {showOTP ? (
        <>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Button text="Submit" onClick={handleEmailSubmit} />
        </>
      ) : (
        <>
          {/* Display OTP field */}
          {/* Display new password and confirm password fields */}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
