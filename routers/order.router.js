const express = require("express");
const {
  addToCart,
  getOrderCheckInByUser,
  checkOutCart,
  getOrderListByUser,
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const orderRouter = express.Router();

// get order list by userId
orderRouter.get("/:userId", authenticate, getOrderListByUser);

// tìm giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.get("/view/:userId", authenticate, getOrderCheckInByUser);

// Thêm, chỉnh sửa số lượng giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.post("/add-to-cart/:userId", authenticate, addToCart);

// check out 1 giỏ hàng: CHECKIN ==> CHECKOUT
orderRouter.put("/chekout/:userId", authenticate, checkOutCart);

module.exports = orderRouter;
