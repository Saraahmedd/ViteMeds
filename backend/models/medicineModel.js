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
        validate: {
          validator: function (value) {
            return value >= 0;
          },
          message: 'Price cannot be negative',
        },
      },
    quantity: {
        type: Number,
        required: [true, 'A medicine must have a quantity'],
        validate: {
            validator: function (value) {
              return value >= 0;
            },
            message: 'Quantity cannot be negative',
          },
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

medicineSchema.statics.getAllMedicinalUses = async function () {
    try {
        const medicines = await this.find();
        const allMedicinalUsesSet = new Set();

        // Extract and add unique medicinal uses to the set
        medicines.forEach(medicine => {
            medicine.medicinalUses.forEach(use => {
                allMedicinalUsesSet.add(use);
            });
        });

        // Convert the set back to an array
        const allMedicinalUses = Array.from(allMedicinalUsesSet);

        return allMedicinalUses;
    } catch (error) {
        throw new Error('Error fetching unique medicinal uses: ' + error.message);
    }
};


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;