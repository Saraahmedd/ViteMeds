const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllMedicinesForUserAndAdmin = factory.getAll(Medicine,'-sales -quantity');
exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);