const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
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
    pharmacyDegree: {
        type: String,
        required: [true, 'A pharmacist must have a pharmacy degree'],
    },
    pharmacyName: {
        type: String,
        required: [true, 'A pharmacist must have a pharmacy name'],
    },

    workingLicense: {

        type: String,
        required: [true, 'A pharmacist must have a working license'],
    },
    workingHours: {
        type: String,
        required: [true, 'A pharmacist must have a working hours'],
    },


});

const PharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = PharmacistModel;