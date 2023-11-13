const mongoose = require("mongoose");
const Medicine = require("./medicineModel");

const orderSchema = new mongoose.Schema({
  medicines: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryAddress: {
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
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "Wallet", "Stripe"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

orderSchema.post("save", async function(doc) {
  if (doc.status === "Pending") {
    // Check if the order is newly created

    for (const orderItem of doc.medicines) {
      const medicine = await Medicine.findById(orderItem.medicine);

      if (medicine) {
        medicine.quantity -= orderItem.quantity;
        medicine.sales += orderItem.quantity * medicine.price;
        await medicine.save();
      }
    }
  } else {
    for (const orderItem of doc.medicines) {
      const medicine = await Medicine.findById(orderItem.medicine);

      if (medicine) {
        medicine.quantity += orderItem.quantity;
        medicine.sales -= orderItem.quantity * medicine.price;
        await medicine.save();
      }
    }
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
