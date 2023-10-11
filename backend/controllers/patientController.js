const Medicine = require("../models/medicineModel");
const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerfactory = require("./handlerFactory");

exports.getpatient = handlerfactory.getOne(Patient);
exports.getAllPatients = handlerfactory.getAll(Patient);

