const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const enums = require('../constants/enums');

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

        if(req.body.role ===  enums.ROLE.PHARMACIST) 
            await Pharmacist.create(req.body)
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
    
    createSendToken(user, 200, req, res);
    }
 );
  