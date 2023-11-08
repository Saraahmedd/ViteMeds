import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_ADDRESSES_FAIL,
    ORDER_ADDRESSES_REQUEST,
    ORDER_ADDRESSES_SUCCESS
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
export const addAddressesReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ORDER_ADDRESSES_SUCCESS:
            return {
                ...state,
                patients: action.payload,
                loading: false,
                error: null,
            };
        case ORDER_ADDRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
