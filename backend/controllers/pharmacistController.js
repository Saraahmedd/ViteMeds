const Medicine = require("../models/medicineModel");
const Pharmacist = require("../models/pharmacistModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getPharmacist = factory.getOne(Pharmacist);
