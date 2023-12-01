// notificationReducers.js

import * as types from "../constants/notificationConstants";

const updateNotificationInitialState = {
  loading: false,
  error: null,
};

export const updateNotificationReducer = (
  state = updateNotificationInitialState,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // You may include the updated notification in the state if needed
      };
    case types.UPDATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNotificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: action.payload,
      };
    case types.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
