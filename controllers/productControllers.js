const tryCatchMiddleware = require("../middleware/tryCatchMiddleware");
const ProductModel = require("../models/productModel");
const AppError = require("../utils/AppError");
require("../models/category");
// const CategoryModel = require("../models/category");

////////////////////////
// ADD PRODUCT
////////////////////////

exports.addProduct = async (req, res) => {
  const products = await ProductModel.create(req.body);
  return res.status(200).json({
    status: true,
    message: "SuccessFully",
    products,
  });
};

////////////////////////
// GET ALL PRODUCT
////////////////////////

// exports.getProduct = async (req, res, next) => {
//   try {
//     const products = await ProductModel.find().populate({
//       path: "category",
//       select: "title",
//     });
//     // .populate("category", "title");
//     return res.status(200).json({
//       status: true,
//       product_length: products.length,
//       products: products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       error: error,
//     });
//   }
// };

exports.getProduct = async (req, res, next) => {
  // const products = await ProductModel.find().populate("category");
  // // .populate("category", "title");
  // return res.status(200).json({
  //   status: true,
  //   product_length: products.length,
  //   products: products,
  // });
  res.status(200).json(res.moreResult);
};

////////////////////////
// GET SINGLE PRODUCT
////////////////////////

exports.getSingleProduct = async (req, res, next) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    return res.status(200).json({
      status: true,
      products: products,
    });
  } catch (error) {
    if (error.name === "CastError")
      return next(
        new AppError(`product is not existed on this ID ${error.value}`, 404)
      );
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

////////////////////////
// DELETE PRODUCT
////////////////////////

// exports.deleteProduct = async (req, res, next) => {
//   try {
//     await ProductModel.deleteOne({
//       _id: req.params.id,
//     });
//     return res.status(200).json({
//       status: true,
//       message: "Deleted Successfully",
//     });
//   } catch (error) {
//     if (error.name === "CastError")
//       return next(
//         new AppError(`product is not existed on this ID ${error.value}`, 404)
//       );
//     return res.status(500).json({
//       status: false,
//       error: error,
//     });
//   }
// };

exports.deleteProduct = tryCatchMiddleware(async (req, res, next) => {
  await ProductModel.deleteOne({
    _id: req.params.id,
  });

  return res.status(200).json({
    status: true,
    message: "Deleted Successfully",
  });
});
