import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { changePasswordAction } from "../src/app/redux/actions/authActions"; // Import your changePasswordAction

function ChangePassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { success, error } = useSelector(
    (state) => state.changePasswordReducer,
  );

  const handlePasswordChange = () => {
    dispatch(
      changePasswordAction({
        passwordCurrent: oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      }),
    );
  };
  const [showError, setShowError] = useState(false);

  const handleClick = () => {
    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }

    setShowError(false);
    dispatch(changePasswordAction(currentPassword, newPassword));
  };
  const onSubmit = () => {};
  return (
    <>
      <div>
        {success ? (
          <Alert variant="success">
            <strong>Success!</strong> Message successfully changed.
          </Alert>
        ) : (
          error && (
            <Alert variant="danger">
              <strong>Error!</strong> An error occurred.
            </Alert>
          )
        )}
      </div>
      <Card
        key="change-password"
        className=" my-3  mx-5 bg-white border-0"
        title={
          <div className="text-capitalize p-3 text-center">Change Password</div>
        }
        subtitle={<></>}
        buttonText="Details"
        onClickButton={() => {}}
      >
        {" "}
        <div className="container">
          <div className="row global-text">
            <div className="mx-auto">
              {/* You can add an image here if needed */}
            </div>
            <div className="pt-4 text-center">
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ChangePassword;
