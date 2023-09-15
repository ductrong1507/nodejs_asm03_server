const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// Kiểm tra có phải admin không
const authorize = async (req, res, next) => {
  // tìm user theo user đã giải mã ở phần authenticate middleware
  const user = await User.findById(req.user.id);

  if (user.isAdmin || user.isSupporter) {
    next();
  } else {
    res.status(403).send({
      status: false,
      message: "Bạn không có quyền Admin!",
    });
  }
};

// Xác thực người dùng với JWT
const authenticate = async (req, res, next) => {
  const accessToken = req.header("accessToken");
  const { userId } = req.params;

  // Kiểm tra xem có token gửi lên hay không
  if (!accessToken) {
    return res.status(401).send({
      status: false,
      message: "Không tìm thấy accessToken!",
    });
  }

  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    // Kiểm tra accessToken hoặc userId gửi kèm có hợp lệ không
    if (err || decoded.id != userId) {
      return res.status(403).send({
        status: false,
        message: "Token không hợp lệ!",
      });
    }

    req.user = decoded;
    return next();
  });
};

module.exports = {
  authorize,
  authenticate,
};
