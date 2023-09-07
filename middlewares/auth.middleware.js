const jwt = require("jsonwebtoken");

// Kiểm tra có phải admin không
const authorize = (req, res, next) => {
  let isAdmin;

  if (req.header("isAdmin") == "true") {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  if (isAdmin) {
    next();
  } else {
    res.send({
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
