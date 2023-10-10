import axios from 'axios';
import baseURL from '../baseURL';

import { formulateQueryString } from '../queryStringBuilder';


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
    MEDICINES_VIEW_FAIL


} from '../constants/medicineConstants';

export const addMedicine = (medicine) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_MEDICINE_REQUEST,
        });
        console.log(medicine)

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.post(
            `${baseURL}/api/v1/medicines/new-medicine`,
            medicine,
            config
        );
        console.log(data)

        dispatch({
            type: ADD_MEDICINE_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        // print error message 
        console.log(error)

        dispatch({
            type: ADD_MEDICINE_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Add medicine failed. Please try again.',
        });
    }
}

export const editMedicine = (id, medicine) => async (dispatch) => {
    try {
        dispatch({
            type: MEDICINE_EDIT_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.patch(
            `${baseURL}/api/v1/medicines/update/${id}`,
            medicine,
            config
        );

        dispatch({
            type: MEDICINE_EDIT_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: MEDICINE_EDIT_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Edit medicine failed. Please try again.',
        });
    }
}

export const deleteMedicine = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MEDICINE_DELETE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.delete(
            `${baseURL}/api/v1/medicines/delete/${id}`,
            config
        );
        dispatch({
            type: MEDICINE_DELETE_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: MEDICINE_DELETE_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Delete medicine failed. Please try again.',
        });
    }
}


export const getMedicineById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MEDICINE_GET_BY_ID_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/medicines/${id}`,
            config
        );
        dispatch({
            type: MEDICINE_GET_BY_ID_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: MEDICINE_GET_BY_ID_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Get medicine failed. Please try again.',
        });
    }
}

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