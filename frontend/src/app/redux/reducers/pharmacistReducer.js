import {
    GET_PHARMACISTS_REQUEST,
    GET_PHARMACISTS_SUCCESS,
    GET_PHARMACISTS_FAIL,
    GET_PHARMACIST_REQUEST,
    GET_PHARMACIST_SUCCESS,
    GET_PHARMACIST_FAIL,
    PHARMACIST_ACCEPTED_REQUEST,
    PHARMACIST_ACCEPTED_SUCCESS,
    PHARMACIST_ACCEPTED_FAIL,
    PHARMACIST_DOWNLOAD_DOCS_REQUEST,
    PHARMACIST_DOWNLOAD_DOCS_SUCCESS,
    PHARMACIST_DOWNLOAD_DOCS_FAIL
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

export const adminAcceptPharmacistReducer = (state = {}, action) => {
    switch (action.type) {
        case PHARMACIST_ACCEPTED_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PHARMACIST_ACCEPTED_SUCCESS:
            return {
                ...state,
                pharmacist: action.payload,
                loading: false,
                error: null,
            };
        case PHARMACIST_ACCEPTED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const downloadPharmacistDocsReducer = (state = {}, action) => {
    switch (action.type) {
        case PHARMACIST_DOWNLOAD_DOCS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PHARMACIST_DOWNLOAD_DOCS_SUCCESS:
            return {
                ...state,
                pharmacist: action.payload,
                loading: false,
                error: null,
            };
        case PHARMACIST_DOWNLOAD_DOCS_FAILL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};