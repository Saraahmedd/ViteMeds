const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.route('/getmedicines').get(patientController.getAllMedicines);

module.exports = router;