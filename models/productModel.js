const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    account_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    name: { type: String, required: true },
    serial_number: { type: Number, required: true },
    price: { type: Number },
    created: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("products", ProductSchema);