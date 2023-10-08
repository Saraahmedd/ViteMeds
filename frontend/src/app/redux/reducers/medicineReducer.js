import {
    ADD_MEDICINE_REQUEST,
    ADD_MEDICINE_SUCCESS,
    ADD_MEDICINE_FAIL,

    MEDICINE_EDIT_REQUEST,
    MEDICINE_EDIT_SUCCESS,
    MEDICINE_EDIT_FAIL,

    MEDICINE_DELETE_REQUEST,
    MEDICINE_DELETE_SUCCESS,
    MEDICINE_DELETE_FAIL,

    MEDICINE_GET_BY_ID_REQUEST,
    MEDICINE_GET_BY_ID_SUCCESS,
    MEDICINE_GET_BY_ID_FAIL,

    MEDICINE_GET_ALL_REQUEST,
    MEDICINE_GET_ALL_SUCCESS,
    MEDICINE_GET_ALL_FAIL,

} from '../constants/medicineConstants';

const addMedicineInitialState = {
    medicine: null,
    loading: false,
    error: null,
};
const editMedicineInitialState = {
    medicine: null,
    loading: false,
    error: null,
};
const deleteMedicineInitialState = {
    medicine: null,
    loading: false,
    error: null,
};
const getMedicineByIdInitialState = {
    medicine: null,
    loading: false,
    error: null,
};
const getAllMedicinesInitialState = {
    medicines: [],
    loading: false,
    error: null,
};



export const addMedicineReducer = (state = addMedicineInitialState, action) => {
    switch (action.type) {
        case ADD_MEDICINE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_MEDICINE_SUCCESS:
            return {
                ...state,
                medicine: action.payload,
                loading: false,
                error: null,
            };
        case ADD_MEDICINE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const editMedicineReducer = (state = editMedicineInitialState, action) => {
    switch (action.type) {
        case MEDICINE_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case MEDICINE_EDIT_SUCCESS:
            return {
                ...state,
                medicine: action.payload,
                loading: false,
                error: null,
            };
        case MEDICINE_EDIT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const deleteMedicineReducer = (state = deleteMedicineInitialState, action) => {
    switch (action.type) {
        case MEDICINE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case MEDICINE_DELETE_SUCCESS:
            return {
                ...state,
                medicine: action.payload,
                loading: false,
                error: null,
            };
        case MEDICINE_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const getMedicineByIdReducer = (state = getMedicineByIdInitialState, action) => {
    switch (action.type) {
        case MEDICINE_GET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case MEDICINE_GET_BY_ID_SUCCESS:
            return {
                ...state,
                medicine: action.payload,
                loading: false,
                error: null,
            };
        case MEDICINE_GET_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const getAllMedicinesReducer = (state = getAllMedicinesInitialState, action) => {
    switch (action.type) {
        case MEDICINE_GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case MEDICINE_GET_ALL_SUCCESS:
            return {
                ...state,
                medicines: action.payload,
                loading: false,
                error: null,
            };
        case MEDICINE_GET_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
