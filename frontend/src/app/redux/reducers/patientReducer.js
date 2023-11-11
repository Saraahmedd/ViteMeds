import {
    VIEW_PATIENTS_REQUEST,
    VIEW_PATIENTS_SUCCESS,
    VIEW_PATIENTS_FAIL,
    VIEW_PATIENT_REQUEST,
    VIEW_PATIENT_SUCCESS,
    VIEW_PATIENT_FAIL,
    VIEW_MY_DETAILS_REQUEST,
    VIEW_MY_DETAILS_FAIL,
    ADD_ADDRESSES_FAIL,
    ADD_ADDRESSES_REQUEST,
    ADD_ADDRESSES_SUCCESS
} from '../constants/patientConstants';

const viewPatientsInitialState = {
    patients: [],
    loading: false,
    error: null,
};

const viewPatientInitialState = {
    patient: null,
    loading: false,
    error: null,
};

export const viewPatientsReducer = (state = viewPatientsInitialState, action) => {
    switch (action.type) {
        case VIEW_PATIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case VIEW_PATIENTS_SUCCESS:
            return {
                ...state,
                patients: action.payload,
                loading: false,
                error: null,
            };
        case VIEW_PATIENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const viewPatientReducer = (state = viewPatientInitialState, action) => {
    switch (action.type) {
        case VIEW_PATIENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case VIEW_PATIENT_SUCCESS:
            return {
                ...state,
                patient: action.payload,
                loading: false,
                error: null,
            };
        case VIEW_PATIENT_FAIL:
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
        case ADD_ADDRESSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };
        case ADD_ADDRESSES_SUCCESS:
            return {
                ...state,
                patients: action.payload,
                loading: false,
                error: null,
                success: true
            };
        case ADD_ADDRESSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };
        default:
            return state;
    }
}

export const viewMyDetailsReducer = (state = viewPatientInitialState, action) => {
    switch (action.type) {
        case VIEW_MY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case VIEW_PATIENTS_SUCCESS:
            return {
                ...state,
                patient: action.payload,
                loading: false,
                error: null,
            };
        case VIEW_MY_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}




