const express = require("express");
const productController = require("../controllers/productControllers");
const moreResult = require("../middleware/moreResult");
const router = express.Router();
const ProductModel = require("../models/productModel");

//////////////////////////////////////////
// BEFORE NOT WORKING ON ADVACNED LAVEL //
//////////////////////////////////////////
// router.post("/add", productController.addProduct);
// router.get("/product", productController.getProduct);
// router.delete("/delete", productController.getProduct);

// router.get("/product/:id", productController.getSingleProduct);
// router.put("/update/:id", productController.getProduct);
/////////////////////////////////////
// AFTER WORKING ON ADVACNED LAVEL //
////////////////////////////////////

router
  .route("/")
  .get(moreResult(ProductModel, "category"), productController.getProduct)
  .post(productController.addProduct);

// .get (productController.getProduct)

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .put(productController.getProduct)
  .delete(productController.deleteProduct);

module.exports = router;
