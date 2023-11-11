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

  router.get('/',patientController.getAllPatients)
module.exports = router;

router.route("/getMyDetails").get( authController.protect,authController.restrictTo("patient"),patientController.getMyDetails);