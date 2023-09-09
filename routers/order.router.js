const express = require("express");
const {
  addToCart,
  getOrderByUser,
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const orderRouter = express.Router();

// tìm giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.get("/view/:userId", authenticate, getOrderByUser);

// Thêm, chỉnh sửa số lượng giỏ hàng của 1 user bất kỳ có kiểm tra token
orderRouter.post("/add-to-cart/:userId", authenticate, addToCart);

// Delete sản phẩm giỏ hàng,
// orderRouter.delete("/delete")

module.exports = orderRouter;
