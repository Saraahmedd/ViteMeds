const Medicine = require("../models/medicineModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const multer = require("multer");

exports.getAllMedicinesForUserAndAdmin = factory.getAll(
  Medicine,
  "-sales -quantity",
  "",
  { status: "unarchived" },
);

exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);
exports.getAllArchivedMedicinesForPharmacist = factory.getAll(
  Medicine,
  "",
  "",
  { status: "archived" },
);

exports.getMedicineById = factory.getOne(Medicine);

exports.updateMedicine = catchAsync(async (req, res, next) => {
  const excludedFields = ["name", "description", "medicinalUses"];
  excludedFields.forEach((field) => delete req.body[field]);
  factory.updateOne(Medicine)(req, res, next);
});

// Assuming Medicine is your model
exports.allMedicinalUses = catchAsync(async (req, res, next) => {
  const resp = await Medicine.getAllMedicinalUses();
  res.status(200).json(resp);
});

// exports.getMedUses = () => await Medicine.getAllMedicinalUses();

exports.createNewMedicine = factory.createOne(Medicine);
exports.deleteMedicine = factory.deleteOne(Medicine);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    // Push the file path into the 'docs' array in req.locals
    req.body.imageURL = `uploads/${uniqueFileName}`;
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG images are allowed."),
      false,
    );
  }
};

exports.upload = multer({ storage, fileFilter });

exports.archiveMedicine = catchAsync(async (req, res, next) => {
  const medicineId = req.params.id;
  const status = req.body.status;
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) {
    return res.status(404).json({
      status: "fail",
      message: "Medicine not found",
    });
  }

  /*if (medicine.status === 'archived') {
          return res.status(400).json({
              status: 'fail',
              message: 'Medicine is already archived',
          });
      }*/
  medicine.status = status;
  await medicine.save();

  res.status(200).json({
    status: "success",
    message: "Medicine " + status + " successfully",
  });
});

exports.viewAlternative = catchAsync(async (req, res, next) => {
  const medicineId = req.params.id;

  // Find the medicine with the given medicineId
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) {
    return res.status(404).json({
      status: "fail",
      message: "Medicine not found",
    });
  }

  const mainActiveIngredients = medicine.mainActiveIngredients;

  // Find alternative medicines with the same main active ingredients
  const alternatives = await Medicine.find({
    _id: { $ne: medicineId }, // Exclude the current medicine
    mainActiveIngredients: { $in: mainActiveIngredients },
  });

  if (alternatives.length > 0) {
    res.status(200).json({
      status: "success",
      message: "Alternative medicines found successfully",
      data: {
        alternatives,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "No alternative medicines found",
    });
  }
});
