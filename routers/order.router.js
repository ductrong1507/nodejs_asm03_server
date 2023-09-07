const express = require("express");
const {
  addToCart,
  getOrderByUser,
} = require("../controllers/order.controller");
const Order = require("../models/Order.model");
const { authenticate } = require("../middlewares/auth.middleware");
const orderRouter = express.Router();

// tìm giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.get("/:userId", authenticate, getOrderByUser);

// Thêm giỏ hàng của 1 user bất kỳ có kiểm tra token

orderRouter.post("/add-to-cart/:userId", authenticate, addToCart);

module.exports = orderRouter;
