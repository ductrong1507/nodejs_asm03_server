const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_DB_URL);
};

module.exports = { connectDB };
