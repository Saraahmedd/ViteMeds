const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authController = require("../controllers/authController");

const io = require("../utils/socket").getIO();
router.use((req, res, next) => {
  req.io = io;
  next();
});

router.post("/send", chatController.sendMessage);
router.get(
  "/history/:userId",
  authController.protect,
  chatController.getChatHistory,
);

module.exports = router;
