import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  GET_TOTAL_ORDER_COUNT_REQUEST,
  GET_TOTAL_ORDER_COUNT_SUCCESS,
  GET_TOTAL_ORDER_COUNT_FAIL,
  GET_TOTAL_SALES_REQUEST,
  GET_TOTAL_SALES_SUCCESS,
  GET_TOTAL_SALES_FAIL,
  GET_ORDER_PROFIT_REQUEST,
  GET_ORDER_PROFIT_SUCCESS,
  GET_ORDER_PROFIT_FAIL,
  GET_ORDER_PROFIT_FOR_MONTH_REQUEST,
  GET_ORDER_PROFIT_FOR_MONTH_SUCCESS,
  GET_ORDER_PROFIT_FOR_MONTH_FAIL,
  GET_ORDER_EXPENSES_REQUEST,
  GET_ORDER_EXPENSES_SUCCESS,
  GET_ORDER_EXPENSES_FAIL,
  GET_ORDER_EXPENSES_FOR_MONTH_REQUEST,
  GET_ORDER_EXPENSES_FOR_MONTH_SUCCESS,
  GET_ORDER_EXPENSES_FOR_MONTH_FAIL,
  TOTAL_SALES_MONTH_REQUEST,
  TOTAL_SALES_MONTH_SUCCESS,
  TOTAL_SALES_MONTH_FAIL,
  FILTERED_ORDERS_FAIL,
  FILTERED_ORDERS_REQUEST,
  FILTERED_ORDERS_SUCCESS,
} from "../constants/orderConstants";

export const viewOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
        error: null,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const viewOrderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orders: action.payload.data,
        loading: false,
        error: null,
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// reducer.js

const initialState = {
  loading: false,
  session: null,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload,
        error: null,
      };
    case MAKE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        session: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cancelOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case ORDER_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case ORDER_CANCEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const getOrderProfitReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_PROFIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_PROFIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case GET_ORDER_PROFIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOrderProfitForMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_PROFIT_FOR_MONTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_PROFIT_FOR_MONTH_SUCCESS:
      return {
        ...state,
        orderProfitForMonth: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_ORDER_PROFIT_FOR_MONTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOrderExpensesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_EXPENSES_SUCCESS:
      return {
        ...state,
        orderExpenses: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_ORDER_EXPENSES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOrderExpensesForMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_EXPENSES_FOR_MONTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_EXPENSES_FOR_MONTH_SUCCESS:
      return {
        ...state,
        orderExpensesForMonth: action.payload.data,
        loading: false,
        error: null,
      };
    case GET_ORDER_EXPENSES_FOR_MONTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getTotalOrderCountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_ORDER_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TOTAL_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        totalOrderCount: action.payload.data, // Adjust based on your API response structure
        loading: false,
        error: null,
      };
    case GET_TOTAL_ORDER_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTotalSalesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOTAL_SALES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TOTAL_SALES_SUCCESS:
      return {
        ...state,
        totalSales: action.payload, // Adjust based on your API response structure
        loading: false,
        error: null,
      };
    case GET_TOTAL_SALES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getTotalSalesPerMonthReducer = (state = {}, action) => {
  console.log("reducer");
  switch (action.type) {
    case TOTAL_SALES_MONTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TOTAL_SALES_MONTH_SUCCESS:
      return {
        ...state,
        totalSales: action.payload.data, // Adjust based on your API response structure
        loading: false,
        error: null,
      };
    case TOTAL_SALES_MONTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFilteredOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTERED_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FILTERED_ORDERS_SUCCESS:
      return {
        ...state,
        filteredOrders: action.payload, // Adjust based on your API response structure
        loading: false,
        error: null,
      };
    case FILTERED_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
