import { Grid } from "@tremor/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from "@/app/redux/actions/userActions";

const Admins = () => {
  const admins = useSelector((state) => state.getUsersReducer.user);
  const CreateisLoading = useSelector((state) => state.registerReducer.loading);
  const RemoveisLoading = useSelector(
    (state) => state.removeUserReducer.loading
  );
  const adminlist = useMemo(() => {
    if (admins && admins.data) {
      const excludedAdminId = JSON.parse(localStorage.getItem("userInfo")).data
        .user._id;

      return admins.data
        .filter((value) => {
          return value._id !== excludedAdminId;
        })
        .map((value) => {
          if (value.role === "administrator") {
            return {
              username: value.username,
            };
          }
          return null;
        })
        .filter((value) => value !== null && typeof value !== "undefined");
    }
    return [];
  }, [admins, modalShow, RemoveisLoading]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, modalShow, CreateisLoading, RemoveisLoading]);
  return <div>Admins</div>;
};

export default Admins;
