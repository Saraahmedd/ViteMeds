import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const socketService = {
  on: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, data) => {
    socket.emit(event, data);
  },
};

export default socketService;
