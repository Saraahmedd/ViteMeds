import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, registerReducer } from './reducers/authReducer';
import { removeUserReducer,  getUsersReducer } from './reducers/userReducer';
import { getPharmacistsReducer, getPharmacistReducer } from './reducers/pharmacistReducer';
import { viewPatientsReducer, viewPatientReducer } from './reducers/patientReducer'
import { getMedicinesReducer, addMedicineReducer, editMedicineReducer, deleteMedicineReducer, getMedicineByIdReducer } from './reducers/medicineReducer';
import { viewOrderDetailsReducer } from './reducers/orderReducer';
import { addAddressesReducer } from './reducers/patientReducer';
const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getMedicinesReducer,
    addMedicineReducer,
    editMedicineReducer,
    deleteMedicineReducer,
    getMedicineByIdReducer,
    getPharmacistsReducer,
    getPharmacistReducer,
    viewPatientsReducer,
    viewPatientReducer,
    getUsersReducer,
    viewOrderDetailsReducer,
    addAddressesReducer
  },
});

export default store;
