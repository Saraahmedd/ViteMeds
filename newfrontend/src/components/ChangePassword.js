"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, TextInput } from '@tremor/react';
import { Button } from '@tremor/react';
import { validatePassword } from '@/app/redux/validators';
import { changePasswordAction } from '../app/redux/actions/authActions';
import { changePasswordReducer } from '@/app/redux/reducers/authReducer';
import { BottomCallout } from "@/components/BottomCallout";

const ChangePassword = () => {

  const dispatch = useDispatch();
  const [visibleFeedback, setVisibleFeedback] = useState(false);


  const {
    loading: changeLoading,
    success: changeSuccess,
    error: changeError,
  } = useSelector((state) => state.changePasswordReducer);

  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePasswordAction({ ...formData }));
    setFormData({
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    });
  };


  return (
    <Card className="prof w-[35rem]">
      {changeSuccess && (
        <BottomCallout
          message="Changing password was successful"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {changeError && (
        <BottomCallout
          message="Your Old password is not correct"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}
      <h1 className="text-xl text-white font-bold">Change Password</h1>
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
        type="password"
        onChange={handleChange}
        placeholder="Old Password"
        error={changeError && "Old Password is incorrect"}
        name="passwordCurrent"
      />
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
        type="password"
        placeholder="New Password"
        onChange={handleChange}
        name="password"
        required
        error={
          !validatePassword(formData.password) && formData.password !== ""
        }
        errorMessage={
          !validatePassword(formData.password) &&
          formData.password !== "" &&
          "Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number"
        }
      />
      <TextInput
        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        name="passwordConfirm"
        required
        error={
          formData.password !== formData.passwordConfirm &&
          formData.passwordConfirm !== ""
        }
        errorMessage={
          formData.password !== formData.passwordConfirm &&
          formData.passwordConfirm !== "" &&
          "Passwords do not match"
        }
      />
      <Button
        loading={changeLoading}
        onClick={handleSubmit}
        className="prof mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
      >
        <span className="ml-3 text-white">Submit</span>
      </Button>
    </Card>
  );
};

export default ChangePassword;
