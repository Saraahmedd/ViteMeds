const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/signup",
  authController.upload.array("documents", 5),
  authController.signup
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/", authController.protect, userController.getAllUsers);
router.route("/:id").delete(authController.protect, userController.deleteUser);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);
router.get("/me", authController.protect, userController.getMe);
router.patch(
  "/changePassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
