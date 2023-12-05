const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { Customer } = require('../models/customer');

exports.createCustomer = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, address, idProduct, sizeOrType, message } = req.body;
  try {
    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      idProduct,
      sizeOrType,
      message
    });
    res.status(200).json({
      success: true,
      message: 'Customer information sent!'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});
