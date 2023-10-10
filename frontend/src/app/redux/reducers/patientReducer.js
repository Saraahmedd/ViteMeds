import {
    VIEW_PATIENTS_REQUEST,
    VIEW_PATIENTS_SUCCESS,
    VIEW_PATIENTS_FAIL,
    VIEW_PATIENT_REQUEST,
    VIEW_PATIENT_SUCCESS,
    VIEW_PATIENT_FAIL,
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




