const mongoose = require("mongoose");
const { Schema } = mongoose;

// Tạo Schema
const sessionChatSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  supporter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Tạo model
const SessionChat = mongoose.model("SessionChat", sessionChatSchema);

module.exports = SessionChat;
