const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require("./handlerFactory");
const Order = require('../models/orderModel')
const User = require('../models/userModel');


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked order
    const order = await Order.findById(req.params.orderId).populate('medicines.medicine');
  
    // 2) Create checkout session
    const lineItems = order.medicines.map((orderItem) => {
      const medicine = orderItem.medicine;
      return {
        name: medicine.name,
        description: medicine.description,
        images: [medicine.imageURL],
        amount: medicine.price * 100, 
        currency: 'egp', 
        quantity: orderItem.quantity,
      };
    });
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: req.params.orderId,
      line_items: lineItems,
      success_url: `${req.protocol}://${req.get('host')}/my-orders?alert=booking`, // Adjust success and cancel URLs
      cancel_url: `${req.protocol}://${req.get('host')}/my-orders?alert=cancel`, // Adjust success and cancel URLs
      customer_email: req.user.username,
    });
  
    // 3) Create session as response
    res.status(200).json({
      status: 'success',
      session,
    });
  });
  

  
  const createOrderCheckout = async session => {
    const orderId = session.client_reference_id;
    const order = await Order.findById(orderId);
    order.isPaid = true;
    order.save({validate: false});
  };
  
  exports.webhookCheckout = (req, res, next) => {
    const signature = req.headers['stripe-signature'];
  
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed'){
      createOrderCheckout(event.data.object);
    
      res.status(200).json({ received: true });
    }
    else {
        const orderId = session.client_reference_id;
        const order = Order.findByIdAndDeleteId(orderId);
        
    res.status(400).json({ received: false });
    }
  };

exports.createOrder = catchAsync(async (req,res, next) => {
    //1. If payment method is Wallet, pay by wallet then place order
   const user = req.user
   if(req.body.paymentMethod === "wallet") {
        if(req.body.totalPrice > user.wallet) return next(new AppError("Not enough wallet", 400));

        else {
            user.wallet = user.wallet - req.body.totalPrice;
            req.body.isPaid = true;
            return;
        }
}
    //2 If payment is COD, place order, DO nth
    //3 If payment is Stripe, yeb2a alla allah
    await factory.createOne(Order)(req,res,next)

    //4. update sales and quantities of the medicine
})