// socketReducers.js
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  NEW_MESSAGE,
  CROSS_NEW_MESSAGE,
  CROSS_SOCKET_CONNECT,
  CROSS_SOCKET_DISCONNECT
} from "../constants/socketConstants";

const initialState = {
  connected: false,
  messages: [],
};

export const socketReducer = (state = initialState, action) => {
  // console.log("here??");
  switch (action.type) {
    case SOCKET_CONNECT:
      return { ...state, connected: true };

    case SOCKET_DISCONNECT:
      return { ...state, connected: false };

    case NEW_MESSAGE:
      // console.log(state.messages);
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};

export const crossSocketReducer = (state = initialState, action) => {
  // console.log("here??");
  switch (action.type) {
    case CROSS_SOCKET_CONNECT:
      return { ...state, connected: true };

    case CROSS_SOCKET_DISCONNECT:
      return { ...state, connected: false };

    case CROSS_NEW_MESSAGE:
      // console.log(state.messages);
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};
