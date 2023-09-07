const mongoose = require("mongoose");
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: { type: String },
  type: { type: String },
  cheapestPrice: { type: String },
  city: { type: String },
  title: { type: String },
  address: { type: String },
  distance: { type: String },
  photos: { type: Array },
  desc: { type: String },
  rating: { type: Number },
  featured: { type: Boolean },
  rooms: [{ type: String, ref: "Room" }],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
