const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const patientModel = require('../models/patientModel');


exports.deleteUser = catchAsync(async (req, res, next) => {

    const user = await userModel.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    const role = user.role;
    await userModel.findByIdAndDelete(req.params.id);

    if (role === 'doctor') {
        await doctorModel.findByIdAndDelete(req.params.id);
    }
    if (role === 'patient') {
        await patientModel.findByIdAndDelete(req.params.id);
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
