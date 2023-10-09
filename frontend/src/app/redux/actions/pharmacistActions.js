import axios from 'axios';
import baseURL from '../baseURL';

import {
    GET_PHARMACISTS_REQUEST,
    GET_PHARMACISTS_SUCCESS,
    GET_PHARMACISTS_FAIL,
    GET_PHARMACIST_REQUEST,
    GET_PHARMACIST_SUCCESS,
    GET_PHARMACIST_FAIL

} from '../constants/pharmacistConstants';

export const getPharmacists = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PHARMACISTS_REQUEST,
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/pharmacist`,
            config
        );

        dispatch({
            type: GET_PHARMACISTS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: GET_PHARMACISTS_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Something went wrong. Please try again.',
        });
    }
}

export const getPharmacist = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PHARMACIST_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };

        const { data } = await axios.get(
            `${baseURL}/api/v1/pharmacist/${id}`,
            config
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
                : 'Something went wrong. Please try again.',
        });
    }
}