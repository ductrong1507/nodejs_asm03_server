const express = require("express");
const {
  getListProduct,
  getProductDetail,
} = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter.get("/", getListProduct);

productRouter.get("/:productId", getProductDetail);

module.exports = productRouter;
