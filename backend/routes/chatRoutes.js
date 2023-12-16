const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authController = require("../controllers/authController");
const io = require("../utils/socket").getIO();


const socketIO = require("socket.io");
const {initSocket} = require("../crossSocket/utils/initSocket");

const io2 = socketIO(8300, {
  cors: {
    origin: ["http://localhost:3000",
            "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});
initSocket(io);


router.use((req, res, next) => {
  req.io = io;
  req.io2=io2;
  next();
});

router.post("/send", chatController.sendMessage);
router.post("/sendCross", chatController.crossSendMessage);
router.get(
  "/history/:userId",
  authController.protect,
  chatController.getChatHistory,
);

module.exports = router;
