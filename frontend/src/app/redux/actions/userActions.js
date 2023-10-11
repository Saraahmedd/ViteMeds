import axios from 'axios';
import {
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USER_REMOVE_FAIL,
  USER_REMOVE_REQUEST,
  USER_REMOVE_SUCCESS
} from '../constants/userConstants';
import baseURL from '../baseURL';

export const removeUser = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REMOVE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.delete(
      `${baseURL}/api/v1/user/${userID}`,
      config
    );

    dispatch({
      type: USER_REMOVE_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: USER_REMOVE_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error deleting user. Please try again.',
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_GET_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/user`,
      config
    );

    dispatch({
      type: USERS_GET_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: USERS_GET_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error GETTINS users. Please try again.',
    });
  }
};