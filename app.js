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
const { productDummy } = require("./DummyData/dummyData");

const app = express();

// các thiết lập cơ bản
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/v1", rootRouter);

// test create server
app.get("/", async (req, res) => {
  res.send({
    message: "Server is running",
  });
});

app.listen(process.env.PORT, () => {
  connectDB()
    .then(async (result) => {
      console.log("Connected!");

      // Nạp product dummy
      const existProduct = await Product.countDocuments();
      console.log("existProduct", existProduct);
      if (existProduct == 0) {
        await Product.insertMany(productDummy);
        console.log("Nạp dữ liệu Product dummy thành công!");
      }

      // Tạo user admin nếu trong hệ thống ko có
      const userAdmin = await User.findOne({ isAdmin: true });

      if (!userAdmin) {
        await User.create({
          fullName: "admin",
          email: "admin@test.com",
          password: bcrypt.hashSync("admin", 10),
          phoneNumber: "0909123456",
          isAdmin: true,
        });
        console.log("Tạo user quyền Admin thành công!");
      }
    })
    .catch((error) => console.log(error));
  console.log(`Booking app listening on port ${process.env.PORT}`);
});
