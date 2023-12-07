const express = require("express");
const authController = require("../controllers/authController");
const notificationController = require("../controllers/notiificationController");
const router = express.Router();

router.patch("/:id", notificationController.updateNotification);
router.get("/", notificationController.getNotifications);

module.exports = router;
