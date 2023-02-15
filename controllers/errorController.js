const AppError = require("../utils/AppError");

// GETTING  CAST ERROR DATABASE ERROR
// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path} => ${err.value}.`;
//   return new AppError(message, 404);
// };

// DEVELOPMENT ERROR
const developmentError = (err, res) => {
  return res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};

// SENDING ERROR MESSAGE
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = err;

  if (error.name === "CastError") {
    // error = handleCastErrorDB(error);
    error = new AppError(`Invalid ${error.path} => ${error.value}`, 404);
  }

  developmentError(error, res);
};
