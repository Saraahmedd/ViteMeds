import axios from 'axios';
import baseURL from '../baseURL';
import {
    VIEW_CART_REQUEST,
    VIEW_CART_SUCCESS,
    VIEW_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    DELETE_FROM_CART_REQUEST,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAIL,
} from '../constants/cartConstants';

export const viewCart = () => async (dispatch) => {
    try {
        dispatch({
            type: VIEW_CART_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/cart`,
            config
        );
        console.log(data.data);
        dispatch({
            type: VIEW_CART_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: VIEW_CART_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'View cart failed. Please try again.',
        });
    }
}

export const addToCart = (medicineId, quantity) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TO_CART_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.post(
            `${baseURL}/api/v1/cart`,
            { medicineId, quantity },
            config
        );

        console.log(data.data);
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Add to cart failed. Please try again.',
        });
    }
 
}

export const deleteFromCart = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FROM_CART_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.delete(
            `${baseURL}/api/v1/cart/items/${id}`,
            config
        );

        console.log(data.data);
        dispatch({
            type: DELETE_FROM_CART_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: DELETE_FROM_CART_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Delete from cart failed. Please try again.',
        });
    }
}

export const updateCart = (medicineId, quantity) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_CART_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.patch(
            `${baseURL}/api/v1/cart/items`,
            { medicineId, quantity },
            config
        );
        console.log(data.data);

        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: UPDATE_CART_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'Update cart failed. Please try again.',
        });
    }   
}
