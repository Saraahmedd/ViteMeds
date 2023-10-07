const mongoose = require('mongoose');
const validator = require('validator');

const pharmacistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
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

const PharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = PharmacistModel;