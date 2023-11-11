const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {
        type: 'string',
        unique: true,
        lowercase: true,
        required : true
    },
    role: {
        type: String,
        enum: ['patient', 'administrator', 'pharmacist'],
        default: 'patient'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    OTP: String,
    passwordResetExpires: Date,
    wallet: {
      type: Number,
      default: 0
    } ,

    active: {
      type: Boolean,
      default: true,
      select: false
    }
    ,
    deliveryAddress: [  {
      index: {
        type: Number,
        unique: true,
        required: true,
      },
      streetAddress: {
          type: String,
          required: true,
      },
      city: {
          type: String,
          required: true,
      },
      state: {
          type: String,
          required: true,
      },
      zipCode: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true,
      }
  }],
    
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
  
    this.passwordConfirm = undefined;
    next();
  });
  
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });  


  
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  

const User = mongoose.model('User', userSchema);

module.exports = User;
