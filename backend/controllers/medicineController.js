const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require("./handlerFactory");

exports.getAllMedicinesForUserAndAdmin = factory.getAll(Medicine,'-sales -quantity');
exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);

exports.getMedicineById = factory.getOne(Medicine);

exports.updateMedicine = catchAsync(async (req, res, next) => {
        const excludedFields = ['name', 'description', 'medicinalUses', 'medicineIngredients'];
        excludedFields.forEach(field => delete req.body[field]);
        factory.updateOne(Medicine)(req, res, next);
    });


exports.createNewMedicine = factory.createOne(Medicine)
exports.deleteMedicine = factory.deleteOne(Medicine);
