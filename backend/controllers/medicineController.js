const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require("./handlerFactory");

exports.getAllMedicinesForUserAndAdmin = factory.getAll(Medicine,'-sales -quantity');
exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);

exports.getMedicineById = factory.getOne(Medicine);
exports.createNewMedicine = factory.createOne(Medicine)
exports.updateMedicine = factory.updateOne(Medicine)
exports.deleteMedicine = factory.deleteOne(Medicine);
