import { configureStore } from "@reduxjs/toolkit";
import {
  loginReducer,
  registerReducer,
  logoutReducer,
  forgetPasswordReducer,
  changePasswordReducer,
  resetPasswordReducer,
} from "./reducers/authReducer";
import { removeUserReducer, getUsersReducer } from "./reducers/userReducer";
import {
  getPharmacistsReducer,
  getPharmacistReducer,
  adminAcceptPharmacistReducer,
  downloadPharmacistDocsReducer,
} from "./reducers/pharmacistReducer";
import {
  viewPatientsReducer,
  viewPatientReducer,
} from "./reducers/patientReducer";
import {
  getMedicinesReducer,
  addMedicineReducer,
  editMedicineReducer,
  deleteMedicineReducer,
  getMedicineByIdReducer,
} from "./reducers/medicineReducer";
import {
  getCartReducer,
  addToCartReducer,
  deleteFromCartReducer,
  updateCartReducer,
} from "./reducers/cartReducer";
import { viewMyDetailsReducer } from "./reducers/patientReducer";
import {
  viewOrderDetailsReducer,
  viewOrderListReducer,
  cancelOrderReducer,
} from "./reducers/orderReducer";
import { addAddressesReducer } from "./reducers/patientReducer";
import { getMedicineAlternativeReducer } from "./reducers/medicineReducer";
import { archiveMedicineReducer } from "./reducers/medicineReducer";
import { getTotalSalesPerMonthReducer } from "./reducers/orderReducer";
import { getFilteredOrdersReducer } from "./reducers/orderReducer";
import {
  getNotificationsReducer,
  updateNotificationReducer,
} from "./reducers/notificationReducer";
import {
  getTotalSalesReducer
} from "./reducers/orderReducer";

import { socketReducer } from "./reducers/socketReducer";

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
    viewOrderDetailsReducer,
    viewOrderListReducer,
    cancelOrderReducer,
    downloadPharmacistDocsReducer,
    getMedicineAlternativeReducer,
    archiveMedicineReducer,
    getFilteredOrdersReducer,
    getTotalSalesPerMonthReducer,
    getNotificationsReducer,
    updateNotificationReducer,
    socketReducer,
    getTotalSalesReducer,
  },
});

export default store;
