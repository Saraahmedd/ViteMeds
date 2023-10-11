const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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