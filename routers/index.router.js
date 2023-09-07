const express = require("express");
const userRouter = require("./user.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/order", orderRouter);

module.exports = rootRouter;
