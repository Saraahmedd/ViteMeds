import {
    MEDICINES_VIEW_FAIL,
    MEDICINES_VIEW_SUCCESS,
    MEDICINES_VIEW_REQUEST
} from '../constants/medicineConstants';

export const getMedicinesReducer = (state = {}, action) => {
    switch (action.type) {
      case MEDICINES_VIEW_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case MEDICINES_VIEW_SUCCESS:{
        return {
          ...state,
          medicines: action.payload,
          loading: false,
          error: null,
        }};
      case MEDICINES_VIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };