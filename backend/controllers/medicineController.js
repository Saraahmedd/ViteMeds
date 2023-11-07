const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require("./handlerFactory");
const multer = require('multer');

exports.getAllMedicinesForUserAndAdmin = factory.getAll(Medicine,'-sales -quantity');
exports.getAllMedicinesForPharmacist = factory.getAll(Medicine);

exports.getMedicineById = factory.getOne(Medicine);

exports.updateMedicine = catchAsync(async (req, res, next) => {
        const excludedFields = ['name', 'description', 'medicinalUses'];
        excludedFields.forEach(field => delete req.body[field]);
        factory.updateOne(Medicine)(req, res, next);
    });
// Assuming Medicine is your model
exports.allMedicinalUses = catchAsync(async(req,res,next)=> {

      const resp = await Medicine.getAllMedicinalUses();
      res.status(200).json(resp)
});


// exports.getMedUses = () => await Medicine.getAllMedicinalUses();

exports.createNewMedicine = factory.createOne(Medicine)
exports.deleteMedicine = factory.deleteOne(Medicine);




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    // Push the file path into the 'docs' array in req.locals
    req.body.imageURL = `uploads/${uniqueFileName}`;
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
    }
  };  

exports.upload = multer({ storage, fileFilter });
