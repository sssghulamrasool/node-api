const CategoryModel = require("../models/category");
exports.getCategory = async (req, res) => {
  const category = await CategoryModel.find();
  return res.status(200).json({
    status: true,
    category,
  });
};
