const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authController = require("../controllers/authController");
// const orderController = require("../controllers/orderController");

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    patientController.getpatient
  );

  router.get('/',patientController.getAllPatients);

  router.route('/addAddressToPatient').patch(authController.protect,authController.restrictTo("patient") ,patientController.addAddressToPatient);
module.exports = router;

