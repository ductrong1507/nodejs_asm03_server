const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getListUser = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;

  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo những giao dịch mới nhất
     */
    const userList = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 });

    // Đếm số lượng transaction
    const totalUser = await User.countDocuments();

    return res.send({
      status: true,
      message: "Lấy danh sách User thành công",
      result: userList,
      page,
      perPage,
      totalUser: totalUser,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "Lấy danh sách User có lỗi",
      result: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    // kiểm tra userName đã tồn tại hay chưa
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      // Xử lý password
      const saltRounds = 10;
      const hashPassword = bcrypt.hashSync(password, saltRounds);

      const userCreated = await User.create({
        fullName,
        email,
        password: hashPassword,
        phoneNumber,
      });
      return res.status(200).send({
        status: true,
        message: "Tạo user thành công!",
        result: userCreated,
      });
    } else {
      return res.send({
        status: false,
        message: "Username đã tồn tại!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Lỗi trong quá trình tạo User!",
      result: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // xử lý thông tin đăng nhập
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "Sai thông tin đăng nhập",
      });
    }

    // Xử lý so sánh password
    const validPassword = bcrypt.compareSync(password, user.password || null);
    console.log("validPassword", validPassword);

    if (!validPassword) {
      return res.status(401).send({
        status: false,
        message: "Sai thông tin đăng nhập",
      });
    }

    // Loại bỏ password để trả data về cho người dùng
    const { password: passwordnone, ...rest } = user._doc;

    // Tạo token bằng jsonwebtoken
    const accessToken = jwt.sign(
      {
        id: user._id,
        admin: user.isAdmin,
        email: user.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      status: true,
      message: "Đăng nhập thành công!",
      result: rest,
      accessToken,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      status: false,
      message: "Lỗi trong quá trình đăng nhập!",
      result: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getListUser,
};
