// socketReducers.js
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  NEW_MESSAGE,
} from "./../constants/socketConstants";

const initialState = {
  connected: false,
  messages: [],
};

export const socketReducer = (state = initialState, action) => {
  console.log("here??");
  switch (action.type) {
    case SOCKET_CONNECT:
      return { ...state, connected: true };

    case SOCKET_DISCONNECT:
      return { ...state, connected: false };

    case NEW_MESSAGE:
      console.log(state.messages);
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};
