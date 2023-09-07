const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // quyền admin lúc nào cũng false
  isSupporter: { type: Boolean, default: false }, // quyền supporter lúc nào cũng false, chỉ có thể tạo tk ở trang admin
});

// tạo Model
const User = mongoose.model("User", userSchema);

module.exports = User;
