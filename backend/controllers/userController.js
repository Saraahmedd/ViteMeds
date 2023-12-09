const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const Patient = require("../models/patientModel");
const Pharmacist = require("../models/pharmacistModel");

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  const role = user.role;
  await userModel.findByIdAndDelete(req.params.id);

  if (role === "pharmacist") {
    await Pharmacist.findOneAndDelete({ user: req.params.id });
  }
  if (role === "patient") {
    await Patient.findOneAndDelete({ user: req.params.id });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = factory.getAll(userModel);

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne(req.user._id);
  res.status(200).json({
    user,
  });
});
