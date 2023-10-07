import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../constants/authConstants';
import baseURL from '../baseURL';


export const login = (username, password) => async (dispatch) => {
  try {
    console.log("hey")
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
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
