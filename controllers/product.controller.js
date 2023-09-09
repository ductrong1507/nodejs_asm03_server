const Product = require("../models/Product.model");

const getListProduct = async (req, res) => {
  // Tạo option phân trang
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || null;
  const category = req.query.category || null;
  const searchWord = req.query.searchWord || null;
  try {
    let productList;

    // tìm sản phẩm theo searchWord category page perPage
    if (searchWord) {
      productList = await Product.find({
        $and: [
          category ? { category } : {},
          searchWord ? { name: { $regex: new RegExp(searchWord, "i") } } : {},
        ],
      })
        .skip((page - 1) * perPage)
        .limit(perPage);
    } else {
      // tìm sản phẩm theo category page perPage
      productList = await Product.find(category ? { category } : {})
        .skip((page - 1) * perPage)
        .limit(perPage);
    }

    // đếm tổng sản phẩm
    const totalProduct = await Product.countDocuments(
      category ? { category } : {}
    );

    return res.status(200).send({
      status: true,
      message: "Lấy danh sách Sản Phẩm thành công",
      result: productList,
      page,
      perPage,
      total: totalProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Lấy danh sách Sản Phẩm thất bại!",
    });
  }
};

const getProductDetail = async (req, res) => {
  const { productId } = req.params;

  try {
    const detailProduct = await Product.findById(productId);

    if (!detailProduct) {
      return res.status(404).send({
        status: false,
        message: `Không tìm thấy sản phẩm có id = ${productId}`,
      });
    }

    const relatedProduct = await Product.find({
      category: detailProduct.category,
      _id: { $ne: detailProduct._id },
    });

    return res.status(200).send({
      status: true,
      message: "Tìm Sản Phẩm theo ID thành công!",
      result: detailProduct,
      relatedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Lấy chi tiết Sản Phẩm thất bại!",
    });
  }
};

module.exports = {
  getListProduct,
  getProductDetail,
};
