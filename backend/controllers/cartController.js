const Cart = require("../models/cartModel");
const Medicine = require("../models/medicineModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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
  const { medicineId, quantity } = req.body;

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
    cart.items[itemIndex].quantity += quantity;
  } else if (medicine.prescription) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    resp = await axios.post(
      "http://localhost:8000/api/v1/prescriptions/check",
      { email: req.body.email },
      config
    );
    if (resp?.statusCode === 200) {
      cart.items.push({ medicine: medicineId, quantity });
    } else {
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
