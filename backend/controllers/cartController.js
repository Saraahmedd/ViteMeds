const Cart = require("../models/cartModel");
const Medicine = require("../models/medicineModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");

exports.getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ patient: req.user.id }).populate(
    "items.medicine"
  );

  if (!cart) {
    return next(new AppError("No cart found for this patient", 404));
  }

  cart = cart.toObject();
  await Promise.all(
    cart.items.map(async (item) => {
      const medicine = await Medicine.findById(item.medicine._id);
      item.currentPrice = medicine.price;
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const { medicineId, quantity, setQuantity } = req.body;

  let cart = await Cart.findOne({ patient: req.user.id });

  if (!cart) {
    cart = await Cart.create({ patient: req.user.id, items: [] });
  }

  const medicine = await Medicine.findById(medicineId);
  if (!medicine) {
    return next(new AppError("No medicine found with that ID", 404));
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.medicine.equals(medicineId)
  );
  let resp;

  if (itemIndex > -1) {
    if (quantity && !setQuantity) {
      console.log("here");
      cart.items[itemIndex].quantity += quantity;
    } else {
      if (setQuantity * 1 <= 0) {
        cart.items.splice(itemIndex, 1);
        console.log(cart.items);
      } else {
        cart.items[itemIndex].quantity = setQuantity;
      }
    }
  } else if (medicine.prescription) {
    const { username } = await User.findById(req.user._id);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      resp = await axios.post(
        "http://localhost:8000/api/v1/prescriptions/check",
        { username: username, medicine: medicine.name },
        config
      );

      console.log("here??");
      cart.items.push({ medicine: medicineId, quantity });
    } catch (err) {
      return next(new AppError("Action not allowed", 400));
    }
  } else {
    cart.items.push({ medicine: medicineId, quantity });
  }

  await cart.save();

  res.status(201).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.addToCartPresc = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  let cart = await Cart.findOne({ patient: user._id });

  if (!cart) {
    cart = await Cart.create({ patient: user._id, items: [] });
  }
  const medicines = await Medicine.find({
    name: { $in: req.body.medicines },
  });

  console.log(medicines);
  console.log(req.body.medicines);
  cart.items = cart.items.concat(
    medicines.map((medicine) => ({
      medicine: medicine._id,
      quantity: 1,
    }))
  );
  await cart.save();
  console.log(cart);
  res.status(200).json({ message: "success" });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { medicineId, quantity } = req.body;
  const cart = await Cart.findOne({ patient: req.user.id });

  if (!cart) {
    return next(new AppError("No cart found for this patient", 404));
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.medicine.equals(medicineId)
  );
  if (itemIndex === -1) {
    return next(
      new AppError("No medicine found with that ID in the cart", 404)
    );
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.removeCartItem = catchAsync(async (req, res, next) => {
  const { medicineId } = req.params;
  const cart = await Cart.findOne({ patient: req.user.id });

  if (!cart) {
    return next(new AppError("No cart found for this patient", 404));
  }

  const itemIndex = cart.items.findIndex((item) =>
    item.medicine.equals(medicineId)
  );

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

module.exports = exports;
