// socketActions.js
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  NEW_MESSAGE,
} from "./../constants/socketConstants";
import socketService from "../socketServices";
import baseURL from "../baseURL";
import axios from "axios";

export const connectSocket = () => ({
  type: SOCKET_CONNECT,
});

export const disconnectSocket = () => ({
  type: SOCKET_DISCONNECT,
});

export const receiveMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

export const initSocket = () => {
  return (dispatch) => {
    dispatch(connectSocket());

    socketService.on("newMessage", (message) => {
      dispatch(receiveMessage(message));
    });

    // Add more event listeners as needed
  };
};

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    try {
      // Assuming you have a proper API endpoint for sending messages
      const response = await axios.post(
        `${baseURL}/api/v1/chat/send`,
        messageData
      );

      if (response.status === 201) {
        // Message sent successfully, no need to do anything here
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
};
