const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authController = require("../controllers/authController");

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    patientController.getpatient
  );

  router.get('/',patientController.getAllPatients);

  router.route('/addAddressToPatient/:_id').post(authController.protect,authController.restrictTo("patient") ,orderController.addAddressToPatient);
module.exports = router;

