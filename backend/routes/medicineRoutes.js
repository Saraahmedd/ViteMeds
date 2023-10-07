const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const medicineController = require('../controllers/medicineController');

const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/:id', medicineController.getMedicineById)

router.route('/getmedicines/pharmacist')
  .get(
    authController.restrictTo('pharmacist'),
    medicineController.getAllMedicinesForPharmacist
  );

  router.route('/getmedicines/admin')
  .get(
    authController.restrictTo('administrator'),
    medicineController.getAllMedicinesForUserAndAdmin
  );

  router.route('/getmedicines')
  .get(
    medicineController.getAllMedicinesForUserAndAdmin
  );


router.route('/new-medicine')
  .post(    
  authController.restrictTo('pharmacist'),
  medicineController.createNewMedicine
);

router.route('/update/:id')
  .patch(    
  authController.restrictTo('pharmacist'),
  medicineController.updateMedicine
);

router.route('/delete/:id')
  .delete(    
  authController.restrictTo('pharmacist'),
  medicineController.deleteMedicine
  );

  module.exports = router;