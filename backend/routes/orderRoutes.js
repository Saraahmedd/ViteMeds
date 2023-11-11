const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.route('/').post(authController.protect,orderController.createOrder);

router.get('/checkout-session/:orderId',orderController.getCheckoutSession);

router.get('/viewOrderDetails/:id',orderController.getOrderDetails);

router.route('/:id').patch(authController.protect,orderController.cancelOrder);

module.exports = router;



