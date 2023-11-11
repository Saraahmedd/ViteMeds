import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, registerReducer, logoutReducer,forgetPasswordReducer,changePasswordReducer,resetPasswordReducer } from './reducers/authReducer';
import { removeUserReducer,  getUsersReducer } from './reducers/userReducer';
import { getPharmacistsReducer, getPharmacistReducer, adminAcceptPharmacistReducer} from './reducers/pharmacistReducer';
import { viewPatientsReducer, viewPatientReducer } from './reducers/patientReducer'
import { getMedicinesReducer, addMedicineReducer, editMedicineReducer, deleteMedicineReducer, getMedicineByIdReducer } from './reducers/medicineReducer';
import {getCartReducer, addToCartReducer, deleteFromCartReducer, updateCartReducer} from './reducers/cartReducer';
import { viewMyDetailsReducer } from './reducers/patientReducer';
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
    addAddressesReducer,
    logoutReducer,
    forgetPasswordReducer,
    getCartReducer,
    addToCartReducer,
    deleteFromCartReducer,
    updateCartReducer,
    adminAcceptPharmacistReducer,
    viewMyDetailsReducer,
    changePasswordReducer,
    resetPasswordReducer,
  },
});

export default store;
