import {
    GET_PHARMACISTS_REQUEST,
    GET_PHARMACISTS_SUCCESS,
    GET_PHARMACISTS_FAIL,
    GET_PHARMACIST_REQUEST,
    GET_PHARMACIST_SUCCESS,
    GET_PHARMACIST_FAIL,
} from '../constants/pharmacistConstants';

const getPharmacistsInitialState = {
    pharmacists: [],
    loading: false,
    error: null,
};
const getPharmacistInitialState = {
    pharmacist: null,
    loading: false,
    error: null,
};
export const getPharmacistsReducer = (state = getPharmacistsInitialState, action) => {
    switch (action.type) {
        case GET_PHARMACISTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PHARMACISTS_SUCCESS:
            return {
                ...state,
                pharmacists: action.payload,
                loading: false,
                error: null,
            };
        case GET_PHARMACISTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const getPharmacistReducer = (state = getPharmacistInitialState, action) => {
    switch (action.type) {
        case GET_PHARMACIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PHARMACIST_SUCCESS:
            return {
                ...state,
                pharmacist: action.payload,
                loading: false,
                error: null,
            };
        case GET_PHARMACIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};