const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        require: true,
        // default: 99,
      },
    },
  ],
  paymentAt: Date,
  status: {
    type: String,
    enum: ["CHECKIN", "CHECKOUT"],
    default: "CHECKIN",
  },
});

// Tạo model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
