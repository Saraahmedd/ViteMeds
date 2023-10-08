

import {
    USER_REMOVE_FAIL,
    USER_REMOVE_REQUEST,
    USER_REMOVE_SUCCESS
  } from '../constants/userConstants';


export const removeUserReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REMOVE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case USER_REMOVE_SUCCESS:{
        console.log("success")
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        }};
      case USER_REMOVE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };