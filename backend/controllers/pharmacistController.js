//const Medicine = require("../models/medicineModel");
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

      res.setHeader('Content-Type', 'application/zip');
      res.attachment('pharmacist_documents.zip');
      archive.pipe(res);
      //console.log(res.headers);
      pharmacist.documents.forEach((document) => {
        archive.file(document, { name: path.basename(document) });
      });

      archive.finalize();
    
})
//Rejecting is removing the user from the system
exports.acceptPharmacist = catchAsync(async (req, res, next) => {

  const pharmacist = await Pharmacist.findByIdAndUpdate(req.params.id, {isApproved:true}, {
    new: true,
    runValidators: true
});

  
  res.status(200).json({
    status: 'success',
    data: {
        data: pharmacist
    }
});

  
});
