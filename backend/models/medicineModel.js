const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({

    

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [40, 'A medicine name must have less or equal then 40 characters'],
        minlength: [10, 'A medicine name must have more or equal then 10 characters'],
    },

    description: {
        type: String,
        required: [true, 'A medicine must have a description'],
    },
    price: {
        type: Number,
        required: [true, 'A medicine must have a price'],
    },
    quantity: {
        type: Number,
        required: [true, 'A medicine must have a quantity'],
    },
    sales: {
        type: Number,
        default: 0,
     },
    expiryDate: {
        type: Date,
        required: [true, 'A medicine must have a expiry date'],
    },
    medicinalUses: {
        type: [String],
        required: [true, 'A medicine must have a medicinal use'],

    },

    medicineIngredients: {
        type: [String],
        required: [true, 'A medicine must have medicinal ingredients'],
    }

});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;