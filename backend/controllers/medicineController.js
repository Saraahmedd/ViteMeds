const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require("./handlerFactory");

exports.getAllMedicinesForUserAndAdmin = factory.getAll(Medicine,'-sales -quantity');
exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);

exports.getMedicineById = factory.getOne(Medicine);

exports.updateMedicine = Medicine =>
    catchAsync(async (req, res, next) => {
        req.body.name = undefined;
        req.body.description = undefined;
        req.body.medicinalUses = undefined;
        req.body.medicineIngredients = undefined;
        factory.updateOne(Medicine)(req, res, next);
    });

// exports.updateMedicine = Medicine =>
//     catchAsync(async (req, res, next) => {
//         const allowedFields = ['price', 'quantity', 'sales']; 
//         const updates = {};

//         allowedFields.forEach(field => {
//             if (req.body[field] !== undefined) {
//                 updates[field] = req.body[field];
//             }
//         });

//         // Merge the filtered updates with the existing req.body
//         req.body = { ...req.body, ...updates };
        
//         factory.updateOne(Medicine)(req, res, next);
//     });

exports.createNewMedicine = factory.createOne(Medicine)
exports.deleteMedicine = factory.deleteOne(Medicine);
