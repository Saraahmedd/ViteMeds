const Medicine = require("../models/medicineModel");
const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerfactory = require("./handlerFactory");

exports.getpatient = handlerfactory.getOne(Patient);
exports.getAllPatients = handlerfactory.getAll(Patient);
exports.getMyDetails = catchAsync(async (req,res,next) => {
    const patient = await Patient.findById(req.params.id);
    if(!patient) return next(new AppError("No patient found with that ID", 404));
    res.status(200).json({
        status: "success",
        data: {
            patient
        }
    })
})

