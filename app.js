const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const rootRouter = require("./routers/index.router");
const { connectDB } = require("./utils/database");
const User = require("./models/User.model");
const Product = require("./models/Product.model");
const Order = require("./models/Order.model");

// import dummy data

const app = express();

// các thiết lập cơ bản
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/v1", rootRouter);

// test create server
app.get("/", async (req, res) => {
  // const user = await User.find();

  // const hotel = await Hotel.find();
  // const room = await Room.find();
  // const transaction = await Transaction.find();

  res.send({
    message: "Server is running",
  });
});

app.listen(process.env.PORT, () => {
  connectDB()
    .then(async (result) => {
      console.log("Connected!");
      const userAdmin = await User.findOne({ isAdmin: true });
      const product = await Product.findOne();
      const order = await Order.findOne();

      // console.log("userAdmin", userAdmin);

      if (!userAdmin) {
        await User.create({
          fullName: "admin",
          email: "admin@test.com",
          password: bcrypt.hashSync("admin", 10),
          phoneNumber: "0909123456",
          isAdmin: true,
        });
      }
    })
    .catch((error) => console.log(error));
  console.log(`Booking app listening on port ${process.env.PORT}`);
});
