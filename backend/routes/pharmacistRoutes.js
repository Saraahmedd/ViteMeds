const express = require("express");
const router = express.Router();
const pharmacistController = require("../controllers/pharmacistController");
const authController = require("../controllers/authController");

router
  .route("/getpharmacist/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    pharmacistController.getPharmacist
  );

module.exports = router;
