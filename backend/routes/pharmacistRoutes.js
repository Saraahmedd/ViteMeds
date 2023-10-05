const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');
const authController = require('../controllers/authController');


router.route('/getmedicines').get(authController.restrictTo('pharmacist'),pharmacistController.getAllMedicines);

module.exports = router;