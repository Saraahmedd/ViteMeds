import axios from "axios";
import baseURL from "../baseURL";

import { formulateQueryString } from "../queryStringBuilder";

import {
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  ADD_MEDICINE_FAIL,
  MEDICINE_EDIT_REQUEST,
  MEDICINE_EDIT_SUCCESS,
  MEDICINE_EDIT_FAIL,
  MEDICINE_DELETE_REQUEST,
  MEDICINE_DELETE_SUCCESS,
  MEDICINE_DELETE_FAIL,
  MEDICINE_GET_BY_ID_REQUEST,
  MEDICINE_GET_BY_ID_SUCCESS,
  MEDICINE_GET_BY_ID_FAIL,
  MEDICINES_VIEW_SUCCESS,
  MEDICINES_VIEW_REQUEST,
  MEDICINES_VIEW_FAIL,
  MEDICINE_ALTERNATIVE_SUCCESS,
  MEDICINE_ALTERNATIVE_FAIL,
  MEDICINE_ALTERNATIVE_REQUEST,
  MEDICINE_ARCHIVE_FAIL,
  MEDICINE_ARCHIVE_REQUEST,
  MEDICINE_ARCHIVE_SUCCESS,
} from "../constants/medicineConstants";

export const addMedicine = (medicine) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_MEDICINE_REQUEST,
    });
    console.log(medicine);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${baseURL}/api/v1/medicines/new-medicine`,
      medicine,
      config,
    );
    console.log(data);

    dispatch({
      type: ADD_MEDICINE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADD_MEDICINE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Add medicine failed. Please try again.",
    });
  }
};

export const editMedicine = (id, medicine) => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_EDIT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/medicines/update/${id}`,
      medicine,
      config,
    );

    dispatch({
      type: MEDICINE_EDIT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MEDICINE_EDIT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Edit medicine failed. Please try again.",
    });
  }
};

export const deleteMedicine = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${baseURL}/api/v1/medicines/delete/${id}`,
      config,
    );
    dispatch({
      type: MEDICINE_DELETE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MEDICINE_DELETE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Delete medicine failed. Please try again.",
    });
  }
};

export const getMedicineById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_GET_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/medicines/${id}`,
      config,
    );
    dispatch({
      type: MEDICINE_GET_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MEDICINE_GET_BY_ID_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get medicine failed. Please try again.",
    });
  }
};

export const getMedicinesAction = (queryObj) => async (dispatch) => {
  console.log("...............")
  try {
    dispatch({
      type: MEDICINES_VIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const queryStr = formulateQueryString(queryObj);

    let url = "";

    if (
      JSON.parse(localStorage.getItem("userInfo")).data.user.role !==
      "pharmacist"
    )
      url = `${baseURL}/api/v1/medicines/getmedicines?${queryStr}`;
    else
      url = `${baseURL}/api/v1/medicines/getmedicines/pharmacist?${queryStr}`;
    const { data } = await axios.get(url, config);
    const { data: medUses } = await axios.get(
      `${baseURL}/api/v1/medicines/medUses`,
      config,
    );
    data.data.medUses = medUses;
    console.log(medUses);
    console.log(data);

    console.log("hey");
    dispatch({
      type: MEDICINES_VIEW_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MEDICINES_VIEW_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Error Retrieving medicines. Please try again.",
    });
  }
};

export const getMedicineAlternativeAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_ALTERNATIVE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/medicines/alternative/${id}`,
      config,
    );
    dispatch({
      type: MEDICINE_ALTERNATIVE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MEDICINE_ALTERNATIVE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get medicine alternative failed. Please try again.",
    });
  }
};

export const archiveMedicine = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_ARCHIVE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = { status };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/medicines/archive/${id}`,
      body,
      config,
    );

    console.log(data);

    dispatch({
      type: MEDICINE_ARCHIVE_SUCCESS,
      payload: data.data,
    });
    dispatch(getMedicinesAction({}));
  } catch (error) {
    dispatch({
      type: MEDICINE_ARCHIVE_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Archive medicine failed. Please try again.",
    });
  }
};
