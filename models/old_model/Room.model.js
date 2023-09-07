const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  maxPeople: { type: Number },
  desc: { type: String },
  roomNumbers: { type: Array },
});

module.exports = mongoose.model("Room", roomSchema);
