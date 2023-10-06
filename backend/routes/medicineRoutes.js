const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const medicineController = require('../controllers/medicineController');

router.route('/getmedicines/pharmacist')
  .get(
    authController.protect,
    authController.restrictTo('pharmacist'),
    medicineController.getAllMedicinesForPharmacist
  );

  router.route('/getmedicines/admin')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    medicineController.getAllMedicinesForUserAndAdmin
  );

  router.route('/getmedicines')
  .get(
    medicineController.getAllMedicinesForUserAndAdmin
  );


  module.exports = router;