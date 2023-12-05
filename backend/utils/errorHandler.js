//Eror Handler Class
class ErrorHandler extends Error {
  constructor(message, statusCode, res) {
    super(message);
    this.statusCode = statusCode;
    // console.log(statusCode, message);
    Error.captureStackTrace(this, this.constructor);
    res.status(statusCode).json({
      success: false,
      message
    });
    // console.log(3);
  }
}

module.exports = { ErrorHandler };
