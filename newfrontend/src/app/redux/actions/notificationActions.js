// notificationActions.js

import baseURL from "../baseURL";
import * as types from "../constants/notificationConstants";
import axios from "axios";

export const updateNotification = (id, isRead) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_NOTIFICATION_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.patch(
      `${baseURL}/api/v1/notifications/${id}`,
      { isRead },
      config,
    );

    dispatch({
      type: types.UPDATE_NOTIFICATION_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_NOTIFICATION_FAILURE,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong. Please try again.",
    });
  }
};

export const getNotifications = () => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_NOTIFICATIONS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    
    const { data } = await axios.get(`${baseURL}/api/v1/notifications`, config);
    console.log(data)

    dispatch({
      type: types.GET_NOTIFICATIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.error(error)
    dispatch({
      type: types.GET_NOTIFICATIONS_FAILURE,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong. Please try again.",
    });
  }
};
