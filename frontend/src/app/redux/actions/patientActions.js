import axios from 'axios';
import baseURL from '../baseURL';

import {
    VIEW_PATIENTS_REQUEST,
    VIEW_PATIENTS_SUCCESS,
    VIEW_PATIENTS_FAIL,
    VIEW_PATIENT_REQUEST,
    VIEW_PATIENT_SUCCESS,
    VIEW_PATIENT_FAIL,
    VIEW_MY_DETAILS_REQUEST,
    VIEW_MY_DETAILS_SUCCESS,
    VIEW_MY_DETAILS_FAIL,
    ADD_ADDRESSES_FAIL,
    ADD_ADDRESSES_REQUEST,
    ADD_ADDRESSES_SUCCESS

} from '../constants/patientConstants';

export const viewPatients = () => async (dispatch) => {
    try {
        dispatch({
            type: VIEW_PATIENTS_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/patient`,
            config
        );

        dispatch({
            type: VIEW_PATIENTS_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: VIEW_PATIENTS_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'View patients failed. Please try again.',
        });
    }
}

export const viewPatient = (id) => async (dispatch) => {
    try {
        dispatch({
            type: VIEW_PATIENT_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/patient/${id}`,
            config
        );

        dispatch({
            type: VIEW_PATIENT_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: VIEW_PATIENT_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'View patient failed. Please try again.',
        });
    }
};
export const addAddressesAction = (address,id) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_ADDRESSES_REQUEST,
        });
        console.log(address)

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.patch(
            `${baseURL}/api/v1/patient/addAddressToPatient`,
            address,
            config
        );
        console.log(data)

        dispatch({
            type: ADD_ADDRESSES_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        // print error message 
        console.log(error)

        dispatch({
            type: ADD_ADDRESSES_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Add addresses failed. Please try again.',
        });
    }
}

export const viewMyDetails = () => async (dispatch) => {
    try {
        dispatch({
            type: VIEW_MY_DETAILS_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/patient/getMyDetails`,
            config
        );

        dispatch({
            type: VIEW_MY_DETAILS_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: VIEW_MY_DETAILS_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'View patient failed. Please try again.',
        });
    }
}
