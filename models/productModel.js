// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Please add a title"],
//   },
//   // category: {
//   //   type: String,
//   //   enum: ["shoes", "flower"],
//   //   default: "shoes",
//   // },
//   category: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "category",
//     },
//   ],
//   price: {
//     type: Number,
//     required: [true, "Please add a price"],
//   },
//   on_sale: {
//     type: Boolean,
//     default: false,
//   },
//   sale_price: {
//     type: String,
//     default: 0.0,
//     required: false,
//   },
//   images: {
//     type: String,
//   },
//   description: {
//     type: String,
//     required: [true, "Please add a description"],
//   },
//   short_description: {
//     type: String,
//   },
// });
// const ProductModel = mongoose.model("product", productSchema);
// module.exports = ProductModel;

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  category: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
  onSale: {
    type: Boolean,
    default: false,
    required: false,
  },
  sale_price: {
    type: Number,
    default: 0.0,
    required: false,
  },

  main_image: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  short_desc: {
    type: String,
    required: false,
  },
});

const ProductModel = mongoose.model("nproduct", ProductSchema);
module.exports = ProductModel;
