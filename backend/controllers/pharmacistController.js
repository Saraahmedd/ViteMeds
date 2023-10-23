const Medicine = require("../models/medicineModel");
const Pharmacist = require("../models/pharmacistModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

exports.getPharmacist = factory.getOne(Pharmacist);

exports.getAllPharmacists = factory.getAll(Pharmacist);

exports.getPharmacistsDoc = catchAsync(async(req,res,next)=> {
    const id = req.params.id;
    const pharmacist = await Pharmacist.findById(id);

    const archive = archiver('zip', {
        zlib: { level: 9 }, 
      });

      res.attachment('pharmacist_documents.zip');
      archive.pipe(res);

      pharmacist.documents.forEach((document) => {
        archive.file(document, { name: path.basename(document) });
      });

      archive.finalize();
    
})