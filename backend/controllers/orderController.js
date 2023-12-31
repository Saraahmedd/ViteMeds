const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked order
  const user = req.user;

  const cart = await Cart.findOne({ patient: req.user._id })
    .populate("items.medicine")
    .exec();
  console.log(cart);

  // 2) Create checkout session
  const lineItems = cart.items.map((item) => {
    console.log(item.medicine);
    return {
      price_data: {
        currency: "usd",
        unit_amount: item.medicine.price * 100,
        product_data: {
          name: item.medicine.name,
          description: item.medicine.description,
          // images: ["http://localhost:8000/"+item.medicine.imageURL],
        },
      },
      //   name: item.medicine.name,
      //   description: item.medicine.description,
      //   images: [item.medicine.imageURL],
      //   amount: item.medicine.price * 100,
      //   currency: 'egp',
      quantity: item.quantity,
    };
  });

  let deliveryAddress = "";
  if (req.body.newDeliveryAddress) {
    const userId = req.user._id; // Assuming you have orderId as a route parameter
    const {
      streetAddress,
      city,
      state,
      zipCode,
      country,
    } = req.body.newDeliveryAddress;
    const user = await User.findById(userId);

    // Add the provided delivery address to the order
    if (user) {
      deliveryAddress = {
        streetAddress,
        city,
        state,
        zipCode,
        country,
      };

      // Initialize existingArray if it's empty or undefined
      user.deliveryAddress = user.deliveryAddress || [];

      // Append the new object to the existing array
      user.deliveryAddress.push(deliveryAddress);
      await user.save({ validateBeforeSave: false });
      console.log(user.deliveryAddress);
      console.log("heyyy");
      deliveryAddress = user.deliveryAddress[user.deliveryAddress.length - 1];
    }
  }
  console.log(deliveryAddress);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    client_reference_id: user._id.toString(),
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3001/patient/profile`, // Adjust success and cancel URLs
    cancel_url: `http://localhost:3001/patient/profile`, // Adjust success and cancel URLs
    // customer_email: "abdullahhatem87@yahoo.com",
    metadata: {
      deliveryAddress:
        req.query.deliveryAddress != "undefined"
          ? req.query.deliveryAddress
          : deliveryAddress._id.toString(),
    },
  });
  // console.log("hey?")
  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

const createOrderCheckout = async (session) => {
  console.log(session);
  const userId = session.client_reference_id;
  const user = await User.findById(userId);
  const cart = await Cart.findOne({ patient: userId });

  const deliveryAddress = user.deliveryAddress.id(
    session.metadata.deliveryAddress
  );

  const order = Order.create({
    medicines: cart.items,
    user: userId,
    deliveryAddress: deliveryAddress || user.deliveryAddress[0],
    paymentMethod: "Stripe",
    isPaid: true,
    totalPrice: cart.totalPrice,
  });
  await Cart.deleteOne({ _id: cart._id });
  // res.status(200).json({message: 'Order created successfully'});
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("2");
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("here");
    createOrderCheckout(event.data.object);
    // console.log(event);

    res.status(200).json({ received: true });
  }
};

exports.createOrder = catchAsync(async (req, res, next) => {
  //1. If payment method is Wallet, pay by wallet then place order
  const user = req.user;
  const cart = await Cart.findOne({ patient: user._id });
  console.log(req.body);
  if (req.body.paymentMethod === "Wallet") {
    if (cart.totalPrice > user.wallet)
      return next(new AppError("Not enough wallet", 400));
    else {
      user.wallet = user.wallet - cart.totalPrice;
      req.body.isPaid = true;
    }
  }

  // const {userId} = await Patient.findOne({user: user._id})
  let deliveryAddress;
  if (req.body.newDeliveryAddress) {
    const userId = req.user._id; // Assuming you have orderId as a route parameter
    const {
      streetAddress,
      city,
      state,
      zipCode,
      country,
    } = req.body.newDeliveryAddress;
    const user = await User.findById(userId);

    // Add the provided delivery address to the order
    if (user) {
      deliveryAddress = {
        streetAddress,
        city,
        state,
        zipCode,
        country,
      };

      // Initialize existingArray if it's empty or undefined
      user.deliveryAddress = user.deliveryAddress || [];

      // Append the new object to the existing array
      user.deliveryAddress.push(deliveryAddress);
      await user.save({ validateBeforeSave: false });
    }
  } else {
    deliveryAddress = user.deliveryAddress.id(req.body.deliveryAddress);
  }
  const order = await Order.create({
    medicines: cart.items,
    user: user._id,
    deliveryAddress: deliveryAddress,
    paymentMethod: req.body.paymentMethod,
    isPaid: req.body.paymentMethod !== "COD",
    totalPrice: cart.totalPrice,
  });

  await Cart.deleteOne({ _id: cart._id });
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "success",
    data: {
      order,
    },
  });
  // await Cart.deleteOne( {patient: userId})

  //4. update sales and quantities of the medicine
});
exports.getOrderDetails = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("medicines.medicine")
    .exec();
  res.status(200).json({ message: "success", data: { data: order } });
});
exports.getMyOrders = catchAsync(async (req, res, next) => {
  req.query.user = req.user._id;
  factory.getAll(Order, undefined, "medicines.medicine")(req, res, next);
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("No order found with that ID", 404));

  order.status = "Cancelled";
  await order.save({ validate: false });
  const user = req.user;
  if (order.isPaid) user.wallet += order.totalPrice;
  user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.getTotalSalesForMonth = catchAsync(async (req, res, next) => {
  const { month } = req.params;

  const currentYear = new Date().getFullYear();

  const startDate = new Date(currentYear, month - 1, 1);
  const endDate = new Date(currentYear, month, 0, 23, 59, 59);

  const salesData = await Order.find({
    //isPaid: true,
    //status: { $ne: 'cancelled' },
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getTotalSales = catchAsync(async (req, res, next) => {
  const salesData = await Order.find({
    //isPaid: true,
    //status: { $ne: 'cancelled' },
  })
    .populate("medicines.medicine")
    .exec();
  console.log(salesData);

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getOrderProfitForMonth = catchAsync(async (req, res, next) => {
  const { month } = req.params;

  const currentYear = new Date().getFullYear();

  const startDate = new Date(currentYear, month - 1, 1);
  const endDate = new Date(currentYear, month, 0, 23, 59, 59);

  const salesData = await Order.find({
    isPaid: true,
    status: { $ne: "Cancelled" },
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getOrderProfit = catchAsync(async (req, res, next) => {
  const salesData = await Order.find({
    isPaid: true,
    status: { $ne: "Cancelled" },
  });

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getOrderExpensesForMonth = catchAsync(async (req, res, next) => {
  const { month } = req.params;

  const currentYear = new Date().getFullYear();

  const startDate = new Date(currentYear, month - 1, 1);
  const endDate = new Date(currentYear, month, 0, 23, 59, 59);

  const salesData = await Order.find({
    isPaid: true,
    status: "Cancelled",
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getOrderExpenses = catchAsync(async (req, res, next) => {
  const salesData = await Order.find({
    isPaid: true,
    status: "Cancelled",
  });

  const totalSales = salesData.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      salesData,
      totalSales,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await factory.getAll(Order)(req, res, next);

  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const count = orders.length;

  res.status(200).json({
    status: "success",
    data: {
      orders,
      totalSales,
      count,
    },
  });
});

exports.getTotalOrderCount = catchAsync(async (req, res, next) => {
  const totalCount = await Order.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      totalCount,
    },
  });
});

exports.getFilteredOrders = catchAsync(async (req, res, next) => {
  console.log("///////nanna");
  const { medicineId } = req.params;
  const { from, to } = req.query;

  let filter = {};

  if (from) {
    filter.createdAt = {
      $gte: from,
    };
  }

  if (to) {
    filter.createdAt = {
      ...filter.createdAt,
      $lte: to,
    };
  }

  console.log(filter);
  if (medicineId) {
    filter["medicines.medicine"] = mongoose.Types.ObjectId(medicineId);
  }

  const orders = await Order.find(filter)
    .populate("medicines.medicine")
    .exec();

  const profits = await Order.find({
    ...filter,
    isPaid: true,
    status: { $ne: "Cancelled" },
  })
    .populate("medicines.medicine")
    .exec();

  const expenses = await Order.find({
    ...filter,
    isPaid: true,
    status: "Cancelled",
  })
    .populate("medicines.medicine")
    .exec();

  let totalSales = 0;
  if (!medicineId) {
    totalSales = orders.reduce((sum, order) => {
      return sum + order.totalPrice;
    }, 0);

    totalProfit = profits.reduce((sum, order) => {
      return sum + order.totalPrice;
    }, 0);

    totalExpenses = expenses.reduce((sum, order) => {
      return sum + order.totalPrice;
    }, 0);
  } else {
    totalSales = orders.reduce((sum, order) => {
      const orderItem = order.medicines.find(
        (orderItem) => orderItem.medicine._id.toString() === medicineId
      );
      if (orderItem) return sum + orderItem.quantity * orderItem.medicine.price;
      else return sum;
    }, 0);

    totalProfit = profits.reduce((sum, order) => {
      const orderItem = order.medicines.find(
        (orderItem) => orderItem.medicine._id.toString() === medicineId
      );
      if (orderItem) return sum + orderItem.quantity * orderItem.medicine.price;
      else return sum;
    }, 0);

    totalExpenses = expenses.reduce((sum, order) => {
      const orderItem = order.medicines.find(
        (orderItem) => orderItem.medicine._id.toString() === medicineId
      );
      if (orderItem) return sum + orderItem.quantity * orderItem.medicine.price;
      else return sum;
    }, 0);
  }
  res.status(200).json({
    status: "success",
    data: {
      orders,
      count: orders.length,
      totalSales,
      totalProfit,
      totalExpenses,
    },
  });
});
