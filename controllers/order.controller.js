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

const getOrderCheckInByUser = async (req, res) => {
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

const checkOutCart = async (req, res) => {
  const { userId } = req.params;
  const { paymentStatus, paymentAt } = req.body;
  console.log("body : ", req.body);
  const time = new Date(paymentAt);
  console.log("time : ", time.toString());

  try {
    // tìm order có tồn tại hay chưa
    let order = await Order.findOne({
      user: userId,
      status: "CHECKIN",
    });

    if (!order) {
      return res.status(404).send({
        status: false,
        message: "Không tồn tại giỏ hàng!",
      });
    }

    if (paymentStatus) {
      order.paymentAt = new Date(paymentAt);
      order.status = "CHECKOUT";

      // Save order lại
      await order.save();

      return res.status(200).send({
        status: true,
        message: "Thanh toán thành công!",
        result: order,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Có lỗi khi thêm giỏ hàng!",
    });
  }
};

const getOrderListByUser = async (req, res) => {
  try {
    const order = await Order.find({
      user: req.user.id,
      status: "CHECKOUT",
    })
      .populate("user")
      .populate("items.product");

    return res.send({
      status: true,
      message: "Lấy danh sách order thành công!",
      result: order,
    });
  } catch (error) {
    console.log("get list error", error);
    return res.send({
      status: false,
      message: "Có lỗi khi lấy danh sách order!",
    });
  }
};

const getDetailOrderById = async (req, res) => {
  const { orderId } = req.query;
  console.log("getDetailOrderById", req.query);

  try {
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
    })
      .populate("user")
      .populate("items.product");

    return res.send({
      status: true,
      message: "Lấy chi tiết order thành công!",
      result: order || [],
    });
  } catch (error) {
    console.log("get list error", error);
    return res.send({
      status: false,
      message: "Có lỗi khi lấy chi tiết order!",
    });
  }
};

const getOrderList = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;

  try {
    /**
     *  lấy dữ liệu dạng phân trang và lọc theo những order mới nhất
     */
    const orderList = await Order.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 })
      .populate("user")
      .populate("items.product");

    // Đếm số lượng order
    const totalOrder = await Order.countDocuments();

    // Tính tổng tiền từ các order đã thanh toán (đã Checkout)
    const totalPayment = await Order.aggregate([
      {
        $match: {
          status: "CHECKOUT", // Lọc các đơn đặt hàng có trạng thái CHECKOUT
        },
      },
      {
        $unwind: "$items", // Mở rộng mảng items thành các documents riêng biệt
      },
      {
        $lookup: {
          from: "products", // Tên bảng Product
          localField: "items.product", // Trường tham chiếu trong Order
          foreignField: "_id", // Trường tham chiếu trong Product
          as: "productInfo", // Đặt tên cho mảng kết quả
        },
      },
      {
        $unwind: "$productInfo", // Mở rộng mảng productInfo thành các documents riêng biệt
      },
      {
        $addFields: {
          price: {
            $toDouble: "$productInfo.price", // Chuyển đổi trường "price" thành kiểu số
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: {
            $multiply: ["$items.quantity", "$price"], // Tính tổng tiền
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice", // Tính tổng tổng tiền từ tất cả các documents
          },
        },
      },
    ]);

    // console.log("totalPayment", totalPayment);

    return res.status(200).send({
      status: true,
      message: "Lấy danh sách Order thành công!",
      result: orderList,
      page,
      perPage,
      totalOrder: totalOrder,
      totalPayment: totalPayment[0].total.toString(),
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      status: false,
      message: "Lấy danh sách Order có lỗi!",
      result: error,
    });
  }
};

module.exports = {
  addToCart,
  getOrderCheckInByUser,
  checkOutCart,
  getOrderListByUser,
  getDetailOrderById,
  getOrderList,
};
