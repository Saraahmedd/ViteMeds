const mongoose = require('mongoose');
const validator = require('validator');

const pharmacistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Pharmacist must belong to a User!']
    },
    name: {
        type: String,
        required: [true, 'A pharmacist must have a name']

    }, email: {
        type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']

    },dateOfBirth: {
        type: Date,
        required: true
      },

    phoneNumber: {
        type: Number,
        required: [true, 'A pharmacist must have a phone number'],
    },
    role: {
        type: String,
        enum: ['pharmacist'],
        default: 'pharmacist'
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    educationalBackground: {
        type: String,
        required: [true, 'A pharmacist must have a pharmacy degree'],
    },affiliation: {
        type: String,
        required: [true, 'A pharmacist must have an affiliation'],
    },
    hourlyRate: {
        type: Number,
        required: [true, 'A pharmacist must have a working hours'],
    },


});

pharmacistSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'user',
    //   select: 'username email'  // Specify the fields you want to select from the referenced User model
    });
    next();
  });

const PharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = PharmacistModel;