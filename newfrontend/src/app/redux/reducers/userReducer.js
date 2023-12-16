import {
  USER_REMOVE_FAIL,
  USER_REMOVE_REQUEST,
  USER_REMOVE_SUCCESS,
  USERS_GET_SUCCESS,
  USERS_GET_FAIL,
  USERS_GET_REQUEST,
} from "../constants/userConstants";

export const removeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case USER_REMOVE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        success: true,
      };
    case USER_REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case "Reset":
      console.log("here");
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    default:
      return state;
  }
};

// Reducer to automatically clear success after 5 seconds
// export const autoClearSuccessReducer = (state = { success: true }, action) => {
//   switch (action.type) {
//     case USER_REMOVE_SUCCESS:
//       setTimeout(() => {
//         useDispatch({ type: "Reset" });
//       }, 5000);
//       return state;
//     default:
//       return state;
//   }
// };

export const getUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERS_GET_SUCCESS: {
      // console.log("success");
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    }
    case USERS_GET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
