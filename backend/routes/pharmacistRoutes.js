const express = require("express");
const router = express.Router();
const pharmacistController = require("../controllers/pharmacistController");
const authController = require("../controllers/authController");

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    pharmacistController.getPharmacist
  );

  router.get("/",authController.protect,
  authController.restrictTo("administrator"),pharmacistController.getAllPharmacists)

router.get("/docs/:id", pharmacistController.getPharmacistsDoc)
module.exports = router;
