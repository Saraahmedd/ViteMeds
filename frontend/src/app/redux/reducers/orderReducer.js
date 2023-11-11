import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    MAKE_ORDER_REQUEST,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_FAILURE
} from '../constants/orderConstants';

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
}

// reducer.js
  
  const initialState = {
    loading: false,
    session: null,
    error: null
  };
  
 export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case MAKE_ORDER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case MAKE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          session: action.payload,
          error: null
        };
      case MAKE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          session: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
//   export default bookingReducer;
  