import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, registerReducer } from './reducers/authReducer';
import { removeUserReducer } from './reducers/userReducer';
import { getMedicinesReducer, addMedicineReducer, editMedicineReducer, deleteMedicineReducer, getMedicineByIdReducer, getAllMedicinesReducer } from './reducers/medicinesReducer';
const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getMedicinesReducer,
  },
});

export default store;
