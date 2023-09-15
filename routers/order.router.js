const express = require("express");
const {
  addToCart,
  getOrderCheckInByUser,
  checkOutCart,
  getOrderListByUser,
  getDetailOrderById,
  getOrderList,
} = require("../controllers/order.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const orderRouter = express.Router();

/**
 * Phần thao tác với cart
 */

// tìm giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.get("/view/:userId", authenticate, getOrderCheckInByUser);

// Thêm, chỉnh sửa số lượng giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.post("/add-to-cart/:userId", authenticate, addToCart);

// check out 1 giỏ hàng: CHECKIN ==> CHECKOUT
orderRouter.put("/chekout/:userId", authenticate, checkOutCart);

/**
 * Phần thao tác với order
 */

// get order list by userId
orderRouter.get("/:userId", authenticate, getOrderListByUser);

// get order list by orderId
orderRouter.get("/detail/:userId", authenticate, getDetailOrderById);

// get all order
orderRouter.get("/admin/:userId", authenticate, authorize, getOrderList);

module.exports = orderRouter;
