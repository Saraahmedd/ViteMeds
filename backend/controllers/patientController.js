const Medicine = require("../models/medicineModel");
const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getpatient = factory.getOne(Patient);
