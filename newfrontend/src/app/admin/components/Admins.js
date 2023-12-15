import { Button, Grid } from "@tremor/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from "@/app/redux/actions/userActions";
import TableComponent from "@/components/Table";
import { Spinner } from "@material-tailwind/react";
import { BottomCallout } from "@/components/BottomCallout";
import { TextInput } from "@tremor/react";
import Image from "next/image";
import { registerAction } from "@/app/redux/actions/authActions";
import { validateEmail, validatePassword } from "@/app/redux/validators";
import PromptMessage from "@/components/PromptMessage";

const Admins = () => {
  const admins = useSelector((state) => state.getUsersReducer.user);
  const {
    loading: registerLoading,
    success: registerSuccess,
    error: registerError,
  } = useSelector((state) => state.registerReducer);

  const {
    loading: removeLoading,
    success: removeSuccess,
    error: removeError,
  } = useSelector((state) => state.removeUserReducer);

  const {
    loading: getUsersLoading,
    success: getUsersSuccess,
    error: getUsersError,
  } = useSelector((state) => state.getUsersReducer);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };
  const adminlist = useMemo(() => {
    if (admins && admins.data) {
      return admins.data
        .map((value) => {
          if (value.role === "administrator") {
            return {
              username: value.username,
              _id: value._id,
            };
          }
          return null;
        })
        .filter((value) => value !== null && typeof value !== "undefined");
    }
    return [];
  }, [admins, removeLoading]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch register action with form data
    dispatch(registerAction({ ...formData, role: "administrator" }));
    // Clear form fields
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, removeLoading, registerLoading]);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const handleDelete = (id) => {
    setShowPrompt(true);
    setDeleteID(id);
  };
  const confirmDelete = () => {
    dispatch(removeUser(deleteID));
    setShowPrompt(!showPrompt);
  };
  const cancelDelete = () => {
    setShowPrompt(!showPrompt);
  };
  return (
    <>
      {registerSuccess && (
        // Show success message for registration
        <BottomCallout
          message="Registration successful"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="User removed successfully"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {registerError && (
        // Show error message for registration failure
        <BottomCallout
          message="Registration failed"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {removeError && (
        // Show error message for user removal failure
        <BottomCallout
          message="Error removing user"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      {getUsersError && (
        // Show error message for fetching users failure
        <BottomCallout
          message="Error fetching users"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      <>
      <PromptMessage
      visible={showPrompt}
      setVisible={setShowPrompt}
      message="Are you sure you want to remove this admin?"
      onConfirm={confirmDelete}
      confirmLoading={removeLoading}
      onCancel={cancelDelete}
      />
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
            <TableComponent
              rows={adminlist}
              columns={["Username"]}
              fields={["username"]}
              buttons={[
                {
                  size: "xs",
                  variant: "secondary",
                  color: "gray",
                  label: "Delete",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  ),
                  function: (id) => handleDelete(id),
                },
              ]}
              badgeColumns={[]}
              title={"Manage the System Admins"}
            />
          </div>

          <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create New Admin
            </h2>
            <TextInput
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
              type="username"
              placeholder="Email"
              name="username"
              required
              error={
                !validateEmail(formData.username) && formData.username !== ""
              }
              errorMessage={
                !validateEmail(formData.username) &&
                formData.username !== "" &&
                "Please enter a valid username"
              }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="password"
              placeholder="Password"
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
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
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
              loading={registerLoading}
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">Submit</span>
            </Button>
          </div>
        </div>{" "}
      </>
    </>
  );
};

export default Admins;
