import {
  ADD_MEDICINE_FAIL,
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  MEDICINE_DELETE_FAIL,
  MEDICINE_DELETE_REQUEST,
  MEDICINE_DELETE_SUCCESS,
  MEDICINE_EDIT_FAIL,
  MEDICINE_EDIT_REQUEST,
  MEDICINE_EDIT_SUCCESS,
  MEDICINE_GET_BY_ID_FAIL,
  MEDICINE_GET_BY_ID_REQUEST,
  MEDICINE_GET_BY_ID_SUCCESS,
  MEDICINES_VIEW_FAIL,
  MEDICINES_VIEW_REQUEST,
  MEDICINES_VIEW_SUCCESS,
  MEDICINE_ALTERNATIVE_FAIL,
  MEDICINE_ALTERNATIVE_REQUEST,
  MEDICINE_ALTERNATIVE_SUCCESS,
  MEDICINE_ARCHIVE_FAIL,
  MEDICINE_ARCHIVE_REQUEST,
  MEDICINE_ARCHIVE_SUCCESS,
} from "../constants/medicineConstants";
const getMedicinesInitialState = {
  medicines: [],
  loading: false,
  error: null,
};

const archiveMedicineInitialState = {
  medicine: null,
  loading: false,
  error: null,
};

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

export const getMedicinesReducer = (state = {}, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case MEDICINES_VIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MEDICINES_VIEW_SUCCESS: {
      return {
        ...state,
        medicines: action.payload,
        loading: false,
        error: null,
      };
    }
    case MEDICINES_VIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
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
};

export const editMedicineReducer = (
  state = editMedicineInitialState,
  action
) => {
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
};

export const deleteMedicineReducer = (
  state = deleteMedicineInitialState,
  action
) => {
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
};

export const getMedicineByIdReducer = (
  state = getMedicineByIdInitialState,
  action
) => {
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
};
export const getMedicineAlternativeReducer = (
  state = getMedicineByIdInitialState,
  action
) => {
  switch (action.type) {
    case MEDICINE_ALTERNATIVE_REQUEST:
      console.log(1111111111111);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MEDICINE_ALTERNATIVE_SUCCESS:
      return {
        ...state,
        medicine: action.payload,
        loading: false,
        error: null,
      };
    case MEDICINE_ALTERNATIVE_FAIL:
      console.log(111113);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const archiveMedicineReducer = (
  state = archiveMedicineInitialState,
  action
) => {
  switch (action.type) {
    case MEDICINE_ARCHIVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MEDICINE_ARCHIVE_SUCCESS:
      return {
        ...state,
        medicine: action.payload,
        loading: false,
        error: null,
      };
    case MEDICINE_ARCHIVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
