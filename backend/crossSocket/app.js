const socketIO = require("socket.io");
const { initSocket } = require("./utils/initSocket");

const io = socketIO(8300, {
  cors: {
    origin: ["http://localhost:3000",
            "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});
initSocket(io);