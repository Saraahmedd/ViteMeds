const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const enums = require('../constants/enums');
const Email = require('./../utils/email');
const crypto = require('crypto');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    if (!req.locals) {
      req.locals = {};
    }
    if (!req.locals.docs) {
      req.locals.docs = [];
    }
    
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    
    // Push the file path into the 'docs' array in req.locals
    req.locals.docs.push(`uploads/${uniqueFileName}`);
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
  }
};

exports.upload = multer({ storage, fileFilter });

function generateOTP(length) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

const Patient = require('../models/patientModel');
const Pharmacist = require('./../models/pharmacistModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    Expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {  
    if(req.body.role === enums.ROLE.ADMIN) {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
          {
            token = req.headers.authorization.split(' ')[1];
          }

        token = req.cookies?.jwt;
        console.log(token);
        const err = new AppError("You are not authorized to create an admin account", 401);

        if(!token) return next(err)

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        
        if(!currentUser || currentUser.role !==  enums.ROLE.ADMIN) return next(err)
    } 

    const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role : req.body.role
      }); 

    req.body.user = newUser.id;
     try {
        if(req.body?.role === undefined || req.body?.role === enums.ROLE.PATIENT )
            await Patient.create(req.body)

        if(req.body.role ===  enums.ROLE.PHARMACIST) {
            req.body.documents = req.locals.docs
            await Pharmacist.create(req.body)
        }
        createSendToken(newUser, 201, req, res);
        }
      catch(err) {
            await User.deleteOne({username: newUser.username})
            res.status(400).json({
                status: "fail",
                data : {
                  data: err
                }
            })
          }
  });
 


exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError('User recently changed password! Please log in again.', 401)
    //   );
    // }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };

  exports.login= catchAsync(async (req, res, next)=> {
    const {username,password}=req.body;

    if(!username || !password) {
        return next(new AppError('Please provide a username and a password', 400));
    }
    const user= await User.findOne({username}).select('+password')

    if (!username || ! (await user.correctPassword(password, user.password))) {
       return next(new AppError("Invalid Credentials",401));
    }
    if(user.role === 'pharmacist'){
      const doc = await Pharmacist.findOne({user: user._id})
      user.doctor = doc
    }
    else if(user.role=== 'patient'){
      const pat = await Patient.findOne({user: user._id})
      user.patient = pat;
    }
    
    createSendToken(user, 200, req, res);
    }
 );

 exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});


exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  let user;
  let toBePassed;
  if(req.body.role === 'patient') {
    toBePassed = await Patient.findOne({ email:req.body.email });
    user = await User.findOne({ _id: toBePassed.user });
  
  }
  else {
    toBePassed = await Pharmacist.findOne({ email:req.body.email });
    user = await User.findOne({ _id: toBePassed.user });
   
  }
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const OTP = generateOTP(6);
  user.OTP = OTP;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  try {
    await new Email(toBePassed, OTP).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'OTP sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err)

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});



exports.resetPassword = catchAsync(async (req, res, next) => {
  
  const user2 = req.body.role === 'patient' ? await Patient.findOne({email: req.body.email}) : await Doctor.findOne({email: req.body.email}) 
  const user = await User.findOne({
    OTP: req.body.OTP,
    _id: user2.user,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});
  