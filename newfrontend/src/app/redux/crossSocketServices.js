// socketService.js

import { io } from "socket.io-client";

// Create a socket connection with the specified user ID
const createSocketConnection = (userId) => {
  return io("http://localhost:8300", {
    query: { userId },
  });
};

let socket = createSocketConnection(); // Initialize without a user ID initially

const crossSocketService = {
  init: (userId) => {
    // Close existing socket connection if any
    socket.disconnect();

    // Reinitialize socket with the user ID
    socket = createSocketConnection(userId);
  },

  on: (event, callback) => {
    socket.on(event, callback);
  },

  emit: (event, data) => {
    socket.emit(event, data);
  },
};

export default crossSocketService;
