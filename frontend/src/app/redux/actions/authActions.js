import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS
} from '../constants/authConstants';
import baseURL from '../baseURL';


export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/login`,
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Login failed. Please try again.',
    });
  }
};

export const registerAction = (reqBody) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true

    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/user/signup`,
      reqBody,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Signup failed, Please try again.',
    });
  }
};
