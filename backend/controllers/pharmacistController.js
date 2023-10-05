const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllMedicines = factory.getAll(Medicine);

