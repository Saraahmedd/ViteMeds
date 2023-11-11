import axios from 'axios';
import baseURL from '../baseURL';

import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILURE } from "../constants/orderConstants";

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

export const makeOrderRequest = () => ({
    type: MAKE_ORDER_REQUEST
  });
  
  export const makeOrderSuccess = session => ({
    type: MAKE_ORDER_SUCCESS,
    payload: session
  });
  
  export const makeOrderFailure = error => ({
    type: MAKE_ORDER_FAILURE,
    payload: error
  });

  export const makeOrder = (body) => async dispatch => {
    console.log(body)
    const stripeModule = await import('@stripe/stripe-js');
    console.log("heree")
    const stripe = await stripeModule.loadStripe('pk_test_51LcefBHcGowY4Vx0nqxA3L6hCswMF2qxZ4Phr2T70nbrw4SKrMYQyayH05jG0vjObczx85nvSaF9iVxqC1aBFT9f00UPxN8UWY');
    try {
      dispatch(makeOrderRequest());
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
      
      // 1) Get checkout session from API

      if(body.paymentMethod === 'Stripe') {
      const { data } = await axios.get(
        `${baseURL}/api/v1/order/checkout-session?deliveryAddress=${body.deliveryAddress}`,
        config
      );

      console.log(data.session.id)
      await stripe.redirectToCheckout({
        sessionId: data.session.id
      });
  
      // 2) Create checkout form + charge credit card
      dispatch(makeOrderSuccess(data.session));
    }
    else {
      const { data } = await axios.post(
        `${baseURL}/api/v1/order`,body,
        config
      );
      dispatch(makeOrderSuccess(data.data))
    }

    } catch (error) {
      console.log(error);
      dispatch(makeOrderFailure(
        error.response
          ? error.response.data.message
          : 'Make order failed. Please try again.'
      ));
      // showAlert('error', error);
    }
  };
