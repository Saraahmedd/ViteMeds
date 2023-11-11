const Medicine = require("../models/medicineModel");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerfactory = require("./handlerFactory");

exports.getpatient = handlerfactory.getOne(Patient);
exports.getAllPatients = handlerfactory.getAll(Patient);

exports.addAddressToPatient = async (req, res, next) => {
    try {
      const userId = req.params._id; // Assuming you have orderId as a route parameter
      const { streetAddress, city, state, zipCode, country } = req.body;
      const user = await User.findById(userId);
  
      // Add the provided delivery address to the order
      if (user) {
        user.deliveryAddress = {
          streetAddress,
          city,
          state,
          zipCode,
          country,
        };
        await user.save();
        res.status(200).json({ message: 'Delivery address added to the patient successfully', user });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    } catch (error) {
      console.error('Error adding address to patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

