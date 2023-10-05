const Medicine = require('../models/medicineModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


exports.getAllMedicines = factory.getAll(Medicine, '-sales -quantity');

exports.getMedicinesByMedicinalUse = catchAsync(async (req, res, next) => {
  const { medicinalUse } = req.query; // Get the 'medicinalUse' query parameter from the URL

  // Create a query to find medicines based on medicinalUse
  const query = { medicinalUses: { $in: [medicinalUse] } };
  const filtered = await Medicine.find(query).select(` -sales -quantity`);

  res.status(200).json({
    status: 'success',
    results: filtered.length,
    data: {
      filtered,
    },
  });
});

