// socketActions.js
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  NEW_MESSAGE,
  CROSS_NEW_MESSAGE,
  CROSS_SOCKET_CONNECT,
  CROSS_SOCKET_DISCONNECT
} from "../constants/socketConstants";
import socketService from "../socketServices";
import crossSocketService from "../crossSocketServices";
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
    console.log("did we pass");
    socketService.init(
      JSON.parse(localStorage.getItem("userInfo")).data.user._id
    );
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

///////////////////////////////////

export const connectSocket2 = () => ({
  type: CROSS_SOCKET_CONNECT,
});

export const disconnectSocket2 = () => ({
  type: CROSS_SOCKET_DISCONNECT,
});

export const receiveMessage2 = (message) => ({
  type: CROSS_NEW_MESSAGE,
  payload: message,
});

export const CrossinitSocket = () => {
  return (dispatch) => {
    console.log("we will connect");
    dispatch(connectSocket2());
    console.log("did we pass");
    crossSocketService.init(
      JSON.parse(localStorage.getItem("userInfo")).data.user._id
    );
    crossSocketService.on("crossnewMessage", (message) => {
      console.log("we received");
      dispatch(receiveMessage2(message));
    });

    // Add more event listeners as needed
  };
};

export const CrossSendMessage = (messageData) => {
  return async (dispatch) => {
    try {
      // Assuming you have a proper API endpoint for sending messages
      const response = await axios.post(
        `${baseURL}/api/v1/chat/sendCross`,
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
