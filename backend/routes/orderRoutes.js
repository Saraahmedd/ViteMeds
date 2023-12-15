const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const router = express.Router();

// router.route('/').post(authController.protect,orderController.createOrder);

router.post(
  "/checkout-session",
  authController.protect,
  orderController.getCheckoutSession
);

router.post("/", authController.protect, orderController.createOrder);

router.get("/viewOrderDetails/:id", orderController.getOrderDetails);

router.get("/", authController.protect, orderController.getMyOrders);

router.route("/:id").patch(authController.protect, orderController.cancelOrder);

router.route("/total-sales_month/:month").get(
  //authController.restrictTo('pharmacist'),//add for administartor too
  orderController.getTotalSalesForMonth
);
router.get("/allOrders", orderController.getAllOrders);
router.get("/orderCount", orderController.getTotalOrderCount);
router.get("/total-sales", orderController.getTotalSales);
router.get("/profit", orderController.getOrderProfit);
router.get("/profitPerMonth/:month", orderController.getOrderProfitForMonth);
router.get("/expenses", orderController.getOrderExpenses);
router.get("expensesPerMonth/:month", orderController.getOrderExpensesForMonth);
router.get("/filtered-orders/:medicineId?", orderController.getFilteredOrders);
module.exports = router;
