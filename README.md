# Website thương mại điện tử Apple

**GitHub:** https://github.com/ductrong1507/apple_website

**Deloy:** https://funix-react-api.web.app/

## Tổng quan dự án

Tạo giao diện và xử lý các logic cho một trang Web thương mại điện tử. Trang Web sẽ bao gồm các chức năng như sau:

#### Trang chủ (_HomePage_):

- **Đường dẫn:** "/".
- **Feature:** Hiển thị thông tin tổng quan về trang web: _sản phẩm, service..._
- **Thành phần:**
  - Banner
  - Danh sách các danh mục
  - Danh sách các sản phẩm trending
  - Các thông tin khác
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_22.png?alt=media&token=a71c2c59-2bba-477f-87b5-cac35f2e3294)

#### Trang xem danh sách sản phẩm (_ShopPage_):

- **Đường dẫn:** "/shop".
- **Feature:** Hiển thị cho người dùng danh sách các sản phẩm đang có hiện tại, đồng thời người dùng cũng có thể tìm kiếm theo: _danh mục, tên gọi,..._
- **Thành phần:**

  - Danh sách Category
  - Danh sách các sản phẩm
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_19.gif?alt=media&token=2fc3c2cf-9d3e-424b-a455-4c238fdffd24)

#### Trang xem chi tiết sản phẩm (_DetailPage_):

- **Đường dẫn:** "/detail/:productId".
- **Feature:** thông tin chi tiết về một sản phẩm: _mô tả, thay đổi màu sắc, thêm giỏ hàng..._
- **Thành phần:**
  - Mô tả sản phẩm
  - Add to cart
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_08.png?alt=media&token=58109da4-d9dc-43f6-b44e-41233a18ccf0)

#### Trang xem giỏ hàng (_CartPage_):

- **Đường dẫn:** "/cart".
- **Feature:** hiển thị danh sách các sản phẩm đã được thêm vào giỏ hàng: _tên, giá, số lượng, add coupon, xóa sản phẩm khỏi giỏ hàng..._
- **Thành phần:**
  - Giỏ hàng
  - Cart total
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_20.png?alt=media&token=fff6ab66-66e7-4834-b20b-8facba20c2d6)

#### Trang xem đơn hàng và đặt hàng (_CheckoutPage_):

- **Đường dẫn:** "/checkout".
- **Feature:** Form để người dùng nhập thông tin giao hàng cũng như thanh toán, thông tin của đơn hàng: _sản phẩm, số lượng, thành tiền..._
- **Additional feature:** Gửi thông tin đặt hàng vào email của người dùng **(Coming soon...)**
- **Thành phần:**
  - Mẫu điền thông tin
  - Thông tin giỏ hàng
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_21.png?alt=media&token=db5ab89f-7a67-4385-8121-963c50a37ad6)

#### Trang đăng ký tài khoản (_RegisterPage_):

- **Đường dẫn:** "/register".
- **Feature:** người dùng điền thông tin để đăng ký tài khoản, Email không được trùng, Password phải nhiều hơn 8 ký tự.
- **Thành phần:**
  - Form đăng ký
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_23.png?alt=media&token=f2fbfbc3-7649-47c9-930f-2c38f1ecb260)

#### Trang đăng nhập (_LoginPage_):

- **Đường dẫn:** "/login".
- **Feature:** đăng nhập vào hệ thống, đưa ra thông báo lỗi nếu người dùng nhập sai thông tin
- **Thành phần:**
  - Form đăng nhập
    ![An old rock in the desert](https://firebasestorage.googleapis.com/v0/b/funix-way.appspot.com/o/xSeries%2FCCDN%2FReactJS%2FAssignment_Images%2FRJS101x_ASM03_10.png?alt=media&token=2a23b361-41fa-4ca9-b53a-4697e65b42b9)
