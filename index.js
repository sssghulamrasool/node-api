require("dotenv").config();
// MONGO DB CONNECTED FILE
require("./config/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/AppError");
const app = express();
const errorController = require("./controllers/errorController");
const productrouter = require("./routes/productRoutes");
const categoryrouter = require("./routes/categoryRoute");

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//  STATIC PATH
app.use(express.static("public"));

// ROUTES
app.use("/api/v2/products", productrouter);
app.use("/api/v2/category", categoryrouter);

// ERROR ROUTE
app.all("*", (req, res, next) => {
  return next(new AppError(`this url is not found ${req.originalUrl}`, 404));
});
// GLOBAL ERROR CONTROLLER
app.use(errorController);

//  SERVER LISTENING
app.listen(process.env.PORT, () => {
  console.log(`server => http://localhost:${process.env.PORT}/`);
});
