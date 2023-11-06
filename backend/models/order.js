const { Order } = require("../models/order");
const { User } = require("../models/user");
const { ErrorHandler } = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const { Product } = require("../models/product");

//Create new Order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("create order");
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerHomeSt,
      customerCity,
      customerDistrict,
      customerWard,
      cart,
    } = req.body;

    const contactInfo = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: {
        homeSt: customerHomeSt,
        ward: customerWard,
        district: customerDistrict,
        province: customerCity,
      },
    };
    let totPrice = 0;
    if (cart.products.length === 0) {
      return next(
        new ErrorHandler("Không có sản phẩm nào trong giỏ hàng.", 400, res)
      );
    }
    for (let i = 0; i < cart.products.length; i++) {
      const prod = await Product.findById(cart.products[i].id, {
        price: 1,
        productType: 1,
      });
      if (prod.productType.length) {
        totPrice += prod.productType[cart.products[i].typeID].price;
        cart.products[i].typeID = prod.productType[cart.products[i].typeID]._id;
      } else {
        totPrice += prod.price;
        cart.products[i].typeID = undefined;
      }
    }

    cart.totalPrice = totPrice;

    const order = await Order.create({
      contactInfo,
      cart,
    });

    let genMDH = BookingIDGenerator(order._id);
    const update = await Order.findByIdAndUpdate(order._id, {
      mdh: genMDH,
    });
    res.status(200).json({
      success: true,
      order: update,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.toString(),
      requestBody: req.body,
    });
  }
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  // const order = await Order.findOne({ mdh: req.params.id });
  const order = await Order.aggregate([
    {
      $match: { mdh: req.params.id },
    },
  ]);

  if (!order) {
    return next(
      new ErrorHandler(`No order not found with id: ${req.params.id}`, 404, res)
    );
  }
  // if (order.orderStatus === 0 || order.orderStatus === 5) {
  res.status(200).json({
    success: true,
    order: order[0],
  });
  // } else {
  //   const shipper = await User.findById({ _id: order.shipper });
  //   order.shipper = shipper;
  //   res.status(200).json({
  //     success: true,
  //     order
  //   });
  // }
});

//Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    let filter = req.query?.filter;
    // let location = req.query?.location;
    let skip = req.query?.skip;
    let limit = req.query?.limit;

    if (filter === undefined) {
      filter = {};
    } else {
      for (let att in filter) {
        if (!isNaN(filter[att])) {
          filter[att] = parseInt(filter[att]);
        }
      }
    }
    if (Object.hasOwn(filter, "shippingInfo.mdh")) {
      filter["shippingInfo.mdh"] = new RegExp(filter["shippingInfo.mdh"]);
    }
    // console.log('filter', filter);

    console.log(req.user.id, req.user.name, req.user.role);
    if (req.user.role == "shipper") {
      try {
        let result = await Order.aggregate(
          myOrdersShipper(filter, req.user._id, skip, limit)
        );

        if (result.length !== 0) {
          res.status(200).json({
            success: true,
            orders: result[0],
          });
        } else {
          res.status(200).json({
            success: true,
            orders: {
              count: 0,
              orderList: [],
            },
          });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
        });
      }
    } else if (req.user.role == "user") {
      const result = await Order.aggregate(
        myOrderUser(filter, req.user._id, skip, limit)
      );
      // console.log(result);
      if (result.length !== 0) {
        res.status(200).json({
          success: true,
          orders: result[0],
        });
      } else {
        res.status(200).json({
          success: true,
          orders: {
            count: 0,
            orderList: [],
          },
        });
      }
    } else if (req.user.role == "admin") {
      try {
        let result = await Order.aggregate(myOrderAdmin(filter, skip, limit));

        // console.log(result);
        if (result.length !== 0) {
          res.status(200).json({
            success: true,
            orders: result[0],
          });
        } else {
          res.status(200).json({
            success: true,
            orders: {
              count: 0,
              orderList: [],
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
});

//Admin

//Get All Orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const { skip, limit } = req.query;
  const orders = await Order.aggregate(myOrdersAdmin(undefined, skip, limit));
  if (orders.length > 0) {
    res.status(200).json(orders[0]);
  } else {
    res.status(200).json({ count: 0, totalPrice: 0, orders: [] });
  }
});

//Delete order by id => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findOneAndDelete({
    "shippingInfo.mdh": req.params.id,
  });
  if (!order) {
    return next(
      new ErrorHandler(`No order not found with id: ${req.params.id}`, 404)
    );
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});

function BookingIDGenerator(ID) {
  let str = `KOGLA`;
  str += getDaysPassedSinceYearStart();
  str += ID.toString().substr(-4).toUpperCase();
  return str;
}

function getDaysPassedSinceYearStart() {
  var now = new Date();
  var startOfThisYear = new Date(now.getFullYear(), 0, 0);
  var diffMs = now - startOfThisYear;
  var diffDays = Math.floor(diffMs / 86400000);
  if (diffDays < 100) {
    return "0" + diffDays;
  } else {
    return diffDays + "";
  }
}

function getLastTwoDigitsOfYear() {
  let year = new Date().getFullYear();
  return year.toString().substr(-2);
}
