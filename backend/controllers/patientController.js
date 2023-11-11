const Medicine = require("../models/medicineModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerfactory = require("./handlerFactory");

exports.getpatient = handlerfactory.getOne(Patient);
exports.getAllPatients = handlerfactory.getAll(Patient);


exports.getMyDetails = catchAsync(async (req,res,next) => {

    const patient = await Patient.findOne( {user: req.user._id});
    console.log(req.user._id)
    if(!patient) return next(new AppError("No patient found with that ID", 404));
    res.status(200).json({
        status: "success",
        data: {
            patient
        }
    })
})

exports.addAddressToPatient =catchAsync(async (req, res, next) => {
      const userId = req.user._id // Assuming you have orderId as a route parameter
      const { streetAddress, city, state, zipCode, country } = req.body;
      const user = await User.findById(userId);
  
      // Add the provided delivery address to the order
      if (user) {
        const newObject = {
          streetAddress,
          city,
          state,
          zipCode,
          country,
        };
        
        // Initialize existingArray if it's empty or undefined
        user.deliveryAddress =user.deliveryAddress || [];
        
        // Append the new object to the existing array
        user.deliveryAddress.push(newObject);
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ message: 'Delivery address added to the patient successfully', user });
      } else {
          return next(new AppError(404,"User not found"))
    }
  });
  

