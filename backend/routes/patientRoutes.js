const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authController = require("../controllers/authController");
// const orderController = require("../controllers/orderController");

router.get("/", authController.protect, patientController.getAllPatients);

router
  .route("/addAddressToPatient")
  .patch(
    authController.protect,
    authController.restrictTo("patient"),
    patientController.addAddressToPatient,
  );
router
  .route("/getMyDetails")
  .get(authController.protect, patientController.getMyDetails);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    patientController.getpatient,
  );

module.exports = router;
