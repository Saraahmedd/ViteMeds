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
    authController.restrictTo('administrator'),
    medicineController.getAllMedicinesForUserAndAdmin
  );

  router.route('/getmedicines')
  .get(
    medicineController.getAllMedicinesForUserAndAdmin
  );


router.post('/new-medicine',medicineController.createNewMedicine)

router.get('/:id', medicineController.getMedicineById)

router.patch('/update/:id', medicineController.updateMedicine)

router.delete('/delete/:id', medicineController.deleteMedicine)


  module.exports = router;