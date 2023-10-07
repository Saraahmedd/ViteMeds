import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
  } from '../constants/authConstants';
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case USER_LOGIN_SUCCESS:{
        console.log("success")
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        }};
      case USER_LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
 
  