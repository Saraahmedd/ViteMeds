const express = require("express");
const router = express.Router({ mergeParams: true });
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

router.get(
  "/:patientId",
  authController.protect,
  cartController.getCart
);

router.post(
  "/:patientId",
  authController.protect,
  cartController.addToCart
);

router.patch(
    "/:patientId/items",
    authController.protect,
    cartController.updateCartItem
  );
  
router.delete(
"/:patientId/items/:medicineId",
authController.protect,
cartController.removeCartItem
);

module.exports = router;
