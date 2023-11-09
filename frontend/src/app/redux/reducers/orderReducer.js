import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
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

