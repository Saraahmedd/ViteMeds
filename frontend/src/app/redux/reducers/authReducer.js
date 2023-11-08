import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT_REQUEST,
    FORGET_PASS_REQUEST,
    FORGET_PASS_SUCCESS,
    FORGET_PASS_FAIL,
    RESET_PASS_REQUEST,
    RESET_PASS_SUCCESS,
    RESET_PASS_FAIL
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

  export const registerReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case USER_REGISTER_SUCCESS:{
        console.log("success")
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        }};
      case USER_REGISTER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case USER_LOGOUT_SUCCESS:{
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          error: null,
        }};
      case USER_LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const forgetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGET_PASS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGET_PASS_SUCCESS:{
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          error: null,
        }};
      case FORGET_PASS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case RESET_PASS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case RESET_PASS_SUCCESS:{
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          error: null,
        }};
      case RESET_PASS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };