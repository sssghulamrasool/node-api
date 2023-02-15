const express = require("express");
const productController = require("../controllers/categoryControllers");

const router = express.Router();
router.route("/").get(productController.getCategory);

module.exports = router;
