import axios from 'axios';
import baseURL from '../baseURL';

import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";

export const viewOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
        const { data } = await axios.get(
            `${baseURL}/api/v1/order/viewOrderDetails/${id}`,
            config
        );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.data,
        });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response
                ? error.response.data.message
                : 'View order details failed. Please try again.',
        });
    }
}
