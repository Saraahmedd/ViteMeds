import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, registerReducer, logoutReducer,forgetPasswordReducer,changePasswordReducer,resetPasswordReducer } from './reducers/authReducer';
import { removeUserReducer,  getUsersReducer } from './reducers/userReducer';
import { getPharmacistsReducer, getPharmacistReducer, adminAcceptPharmacistReducer} from './reducers/pharmacistReducer';
import { viewPatientsReducer, viewPatientReducer } from './reducers/patientReducer'
import { getMedicinesReducer, addMedicineReducer, editMedicineReducer, deleteMedicineReducer, getMedicineByIdReducer } from './reducers/medicineReducer';
import {getCartReducer, addToCartReducer, deleteFromCartReducer, updateCartReducer} from './reducers/cartReducer'
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
    logoutReducer,
    forgetPasswordReducer,
    getCartReducer,
    addToCartReducer,
    deleteFromCartReducer,
    updateCartReducer,
    adminAcceptPharmacistReducer,
    changePasswordReducer,
    resetPasswordReducer,
  },
});

export default store;
