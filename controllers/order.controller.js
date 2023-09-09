const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // Kiểm tra người dùng có order chưa thanh toán chưa, nếu chưa thì tạo mới
    let order = await Order.findOne({
      user: userId,
      status: "CHECKIN",
    });

    if (!order) {
      order = new Order({
        user: userId,
        items: [],
      });
    }

    //   Kiểm tra xem sản phẩm tồn tại trong giở hàng chưa
    const index = order.items.findIndex(
      (item) => item.product.toString() == productId.toString()
    );

    // nếu tồn tại sản phẩm cần kiểm tra xem số lượng sản phẩm có = 0 hay ko
    if (index !== -1) {
      if (order.items[index].quantity + quantity == 0) {
        // xóa sản phẩm luôn
        order.items.splice(index, 1);
      } else {
        order.items[index].quantity += quantity;
      }
    } else {
      // Nếu sản phẩm chưa tồn tại trong đơn đặt hàng, thêm mới
      order.items.push({ product: productId, quantity });
    }

    // const addedProduct = await Product.findById(productId);

    // Save order lại
    await order.save();

    return res.status(200).send({
      status: true,
      message: "Thêm giỏ hàng thành công!",
      result: order,
      // addedProduct,
    });
  } catch (error) {
    console.log("order error", error);
    return res.status(500).send({
      status: false,
      message: "Có lỗi khi thêm giỏ hàng!",
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const order = await Order.findOne({
      user: req.user.id,
      status: "CHECKIN",
    })
      .populate("user")
      .populate("items.product");

    return res.send({
      status: true,
      message: "Lấy thông tin giỏ hàng thành công!",
      result: order || {},
    });
  } catch (error) {
    console.log("get list error", error);
    return res.send({
      status: false,
      message: "Có lỗi khi lấy thông tin giỏ hàng!",
    });
  }
};

module.exports = {
  addToCart,
  getOrderByUser,
};
