const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  category: { type: String, require: true },
  short_desc: { type: String, require: false },
  long_desc: { type: String, require: true },
  img1: { type: String, require: true },
  img2: { type: String, require: false },
  img3: { type: String, require: false },
  img4: { type: String, require: false },
});

// Tạo model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
