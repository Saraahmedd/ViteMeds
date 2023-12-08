const express = require("express");
const router = express.Router({ mergeParams: true });
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

router.get("/", authController.protect, cartController.getCart);

router.post("/", authController.protect, cartController.addToCart);

router.patch("/items", authController.protect, cartController.updateCartItem);

router.delete(
  "/items/:medicineId",
  authController.protect,
  cartController.removeCartItem,
);

module.exports = router;
