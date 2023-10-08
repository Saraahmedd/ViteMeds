import { configureStore } from '@reduxjs/toolkit';
import {loginReducer, registerReducer} from './reducers/authReducer';
import {removeUserReducer} from './reducers/userReducer';
import { getMedicinesReducer } from './reducers/medicinesReducer';
const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    removeUserReducer,
    getMedicinesReducer,
  },
});

export default store;
