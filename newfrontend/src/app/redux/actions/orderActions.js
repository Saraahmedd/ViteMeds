import axios from "axios";
import baseURL from "../baseURL";

import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  TOTAL_SALES_MONTH_REQUEST,
  TOTAL_SALES_MONTH_SUCCESS,
  TOTAL_SALES_MONTH_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_TOTAL_ORDER_COUNT_REQUEST,
  GET_TOTAL_ORDER_COUNT_SUCCESS,
  GET_TOTAL_ORDER_COUNT_FAIL,
  GET_TOTAL_SALES_REQUEST,
  GET_TOTAL_SALES_SUCCESS,
  GET_TOTAL_SALES_FAIL,
  FILTERED_ORDERS_REQUEST,
  FILTERED_ORDERS_SUCCESS,
  FILTERED_ORDERS_FAIL,
} from "../constants/orderConstants";

export const viewOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${baseURL}/api/v1/order/viewOrderDetails/${id}`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "View order details failed. Please try again.",
    });
  }
};

export const viewOrderList = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(`${baseURL}/api/v1/order`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response
        ? error.response.data.message
        : "View order details failed. Please try again.",
    });
  }
};

export const cancelOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.patch(
      `${baseURL}/api/v1/order/${id}`,
      {},
      config
    );

    dispatch({
      type: ORDER_CANCEL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload: error.response
        ? error.response.data.message
        : "View order details failed. Please try again.",
    });
  }
};

export const makeOrderRequest = () => ({
  type: MAKE_ORDER_REQUEST,
});

export const makeOrderSuccess = (session) => ({
  type: MAKE_ORDER_SUCCESS,
  payload: session,
});

export const makeOrderFailure = (error) => ({
  type: MAKE_ORDER_FAILURE,
  payload: error,
});

export const makeOrder = (body) => async (dispatch) => {
  // console.log(body);
  const stripeModule = await import("@stripe/stripe-js");
  // console.log("heree");
  const stripe = await stripeModule.loadStripe(
    "pk_test_51LcefBHcGowY4Vx0nqxA3L6hCswMF2qxZ4Phr2T70nbrw4SKrMYQyayH05jG0vjObczx85nvSaF9iVxqC1aBFT9f00UPxN8UWY"
  );
  try {
    dispatch(makeOrderRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // 1) Get checkout session from API

    if (body.paymentMethod === "Stripe") {
      const { data } = await axios.get(
        `${baseURL}/api/v1/order/checkout-session?deliveryAddress=${body.deliveryAddress}`,
        config
      );

      // console.log(data.session.id);
      await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });

      // 2) Create checkout form + charge credit card
      dispatch(makeOrderSuccess(data.session));
    } else {
      const { data } = await axios.post(
        `${baseURL}/api/v1/order`,
        body,
        config
      );
      dispatch(makeOrderSuccess(data.data));
      window.location.href = "/patient/profile";
    }
  } catch (error) {
    // console.log(error);
    dispatch(
      makeOrderFailure(
        error.response
          ? error.response.data.message
          : "Make order failed. Please try again."
      )
    );
    // showAlert('error', error);
  }
};
export const getTotalSalesForMonth = (month) => async (dispatch) => {
  try {
    dispatch({
      type: TOTAL_SALES_MONTH_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/order/total-sales_month/${month}`,
      config
    );

    dispatch({
      type: TOTAL_SALES_MONTH_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_SALES_MONTH_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get total sales for month failed. Please try again.",
    });
  }
};

// Action creators for getting all orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/order/allOrders`,
      config
    );

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get all orders failed. Please try again.",
    });
  }
};
export const getTotalOrderCount = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOTAL_ORDER_COUNT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/order/orderCount`,
      config
    );

    dispatch({
      type: GET_TOTAL_ORDER_COUNT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_ORDER_COUNT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get total order count failed. Please try again.",
    });
  }
};

// Action creators for getting total sales
export const getTotalSales = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOTAL_SALES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${baseURL}/api/v1/order/total-sales`,
      config
    );

    dispatch({
      type: GET_TOTAL_SALES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_SALES_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get total sales failed. Please try again.",
    });
  }
};

export const getFilteredOrders = (medicineId, from, to) => async (dispatch) => {
  try {
    dispatch({
      type: FILTERED_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    let url = `${baseURL}/api/v1/order/filtered-orders`;

    const params = [];

    if (medicineId) {
      url += `/` + `${medicineId}`;
    }

    if (from || to) url += "?";
    if (from) url += "from=" + new Date(from);
    if (to) url += "&to=" + new Date(to);

    const { data } = await axios.get(url, config);
    dispatch({
      type: FILTERED_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FILTERED_ORDERS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Get filtered orders failed. Please try again.",
    });
  }
};
