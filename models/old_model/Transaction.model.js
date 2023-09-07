const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    ref: "User",
    required: true,
  },

  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: { type: Array, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number },
  payment: { type: String, required: true },
  status: {
    type: String,
    enum: ["Booked", "Checkin", "Checkout"],
    default: "Booked",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
