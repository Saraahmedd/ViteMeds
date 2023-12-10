import axios from "axios";
import baseURL from "../baseURL";

import {
  GET_PHARMACISTS_REQUEST,
  GET_PHARMACISTS_SUCCESS,
  GET_PHARMACISTS_FAIL,
  GET_PHARMACIST_REQUEST,
  GET_PHARMACIST_SUCCESS,
  GET_PHARMACIST_FAIL,
  PHARMACIST_ACCEPTED_REQUEST,
  PHARMACIST_ACCEPTED_SUCCESS,
  PHARMACIST_ACCEPTED_FAIL,
  PHARMACIST_DOWNLOAD_DOCS_REQUEST,
  PHARMACIST_DOWNLOAD_DOCS_SUCCESS,
  PHARMACIST_DOWNLOAD_DOCS_FAIL,
} from "../constants/pharmacistConstants";

export const getPharmacists = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PHARMACISTS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(`${baseURL}/api/v1/pharmacist`, config);

    dispatch({
      type: GET_PHARMACISTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PHARMACISTS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong. Please try again.",
    });
  }
};

export const getPharmacist = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PHARMACIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/pharmacist/${id}`,
      config,
    );
    dispatch({
      type: GET_PHARMACIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PHARMACIST_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Something went wrong. Please try again.",
    });
  }
};

export const adminAcceptPharmacist =
  (pharmacistId, body) => async (dispatch) => {
    try {
      dispatch({
        type: PHARMACIST_ACCEPTED_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      let url = "";

      url = `${baseURL}/api/v1/pharmacist/acceptpharmacist/${pharmacistId}`;

      const { data } = await axios.patch(url, body, config);

      dispatch({
        type: PHARMACIST_ACCEPTED_SUCCESS,
        pharmacist: data.data,
      });
    } catch (error) {
      dispatch({
        type: PHARMACIST_ACCEPTED_FAIL,
        payload: error.response
          ? error.response.data.message
          : "Accepting pharmacist failed. Please try again.",
      });
    }
  };

export const downloadPharmacistDocs = (pharmacistId) => async (dispatch) => {
  try {
    dispatch({
      type: PHARMACIST_DOWNLOAD_DOCS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/zip",
      },
      responseType: "blob",
      withCredentials: true,
    };

    const url = `${baseURL}/api/v1/pharmacist/docs/${pharmacistId}`;

    const response = await axios.get(url, config);

    const ContentDisposition = response.headers["content-disposition"];
    const fileName = "pharmacist_documents.zip";

    const blob = new Blob([response.data]);
    // console.log(blob);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    dispatch({
      type: PHARMACIST_DOWNLOAD_DOCS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PHARMACIST_DOWNLOAD_DOCS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Downloading pharmacist documents failed. Please try again.",
    });
  }
};
