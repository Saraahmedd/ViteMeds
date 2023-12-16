// utils/socket.js
let io;

exports.initSocket = (socketIO) => {
  io = socketIO;

  console.log("Socket initialized");

  io.on("connection", (socket) => {
    console.log("user connected to cross server");
    const patientId = socket.handshake.query.patientId;

    socket.join(`/patient/${patientId}`);

    // Additional socket event handling can be added here

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
