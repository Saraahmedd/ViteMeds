const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  items: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1."],
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre("save", async function (next) {
  const cart = this;
  await Promise.all(
    cart.items.map(async (item, index) => {
      const medicine = await mongoose.model("Medicine").findById(item.medicine);
      if (medicine) {
        cart.items[index].price = medicine.price;
      }
    }),
  );

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  cart.items.forEach((item) => {
    delete item.price;
  });

  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
