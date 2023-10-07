import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from './reducers/authReducer';

const store = configureStore({
  reducer: {
    loginReducer,
  },
});

export default store;
