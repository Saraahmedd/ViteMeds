const io = require("socket.io-client");
const socket = io("http://localhost:8080"); // Replace with your server URL

// Event handlers
socket.on("connect", () => {
  console.log("Connected to the server");
  //Handle security issues: Abdullah
});

socket.on("newMessage", (data) => {
  console.log("Received new message:", data);
});

// Send a test message
socket.emit("message", "Hello, server!");
