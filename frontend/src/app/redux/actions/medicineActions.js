import axios from 'axios';
import {
    MEDICINES_VIEW_FAIL,
    MEDICINES_VIEW_SUCCESS,
    MEDICINES_VIEW_REQUEST
} from '../constants/medicineConstants';
import baseURL from '../baseURL';
import { formulateQueryString } from '../queryStringBuilder';

export const getMedicinesAction = (queryObj) => async (dispatch) => {
  try {
    
    dispatch({
      type: MEDICINES_VIEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    const queryStr = formulateQueryString(queryObj)
  
    const { data } = await axios.get(
      `${baseURL}/api/v1/medicines/getmedicines?${queryStr}`,
      config
    );

    dispatch({
      type: MEDICINES_VIEW_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    dispatch({
      type: MEDICINES_VIEW_FAIL,
      payload: error.response
        ? error.response.data.message
        : 'Error Retrieving medicines. Please try again.',
    });
  }
};