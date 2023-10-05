const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(authController.protect);

router.route('/getmedicines').get(authController.restrictTo('administrator'),adminController.getAllMedicines);

module.exports = router;
