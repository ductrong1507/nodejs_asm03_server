const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const sessionChatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Tạo model
const SessionChat = mongoose.model("SessionChat", sessionChatSchema);

module.exports = SessionChat;
